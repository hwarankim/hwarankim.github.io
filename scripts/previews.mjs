// Screenshots the first screen of each subpage into public/previews/, for the paper inside the
// folder-opening animation. Run after `npm run build` whenever a subpage's first screen changes:
//
//   npm run build && npm run previews && npm run build
//
// Needs Node 22+ and Google Chrome (or set CHROME_PATH). No dependencies.

import { spawn } from 'node:child_process';
import { createReadStream, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { homedir, tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';

const root = resolve('out');
const dest = resolve('public/previews');
const pages = ['about-me', 'academics', 'work-experience', 'extra'];
// The phone size is used below 768px wide, the desktop size everywhere else.
const sizes = { desktop: [1440, 900], phone: [390, 844] };

const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  join(homedir(), 'Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
  join(homedir(), 'Desktop/Google Chrome.app/Contents/MacOS/Google Chrome'),
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p));

if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH to its executable.');
if (!existsSync(join(root, 'index.html'))) throw new Error('Run `npm run build` first: out/ is missing.');

// A small static server for out/, with the same trailing-slash routes as GitHub Pages.
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webm': 'video/webm', '.txt': 'text/plain', '.pdf': 'application/pdf' };
const server = createServer((req, res) => {
  let file = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!file.startsWith(root) || !existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const site = `http://127.0.0.1:${server.address().port}`;

// Chrome is driven over the DevTools protocol so it can emulate a real 390px phone screen,
// which a plain --window-size screenshot cannot (headless windows have a minimum width).
const profile = mkdtempSync(join(tmpdir(), 'previews-'));
const browser = spawn(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' });

const portFile = join(profile, 'DevToolsActivePort');
for (let i = 0; !existsSync(portFile) || !readFileSync(portFile, 'utf8').includes('\n'); i += 1) {
  if (i > 200) throw new Error('Chrome did not start.');
  await new Promise((r) => setTimeout(r, 100));
}
const debugPort = readFileSync(portFile, 'utf8').split('\n')[0];
const target = (await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json()).find((t) => t.type === 'page');

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((ok) => { ws.onopen = ok; });
let nextId = 0;
const pending = new Map();
const waiters = [];
ws.onmessage = ({ data }) => {
  const msg = JSON.parse(data);
  if (pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  } else {
    waiters.filter((w) => w.method === msg.method).forEach((w) => w.ok());
  }
};
const send = (method, params = {}) => new Promise((ok, ko) => {
  const id = ++nextId;
  pending.set(id, (m) => (m.error ? ko(new Error(`${method}: ${m.error.message}`)) : ok(m.result)));
  ws.send(JSON.stringify({ id, method, params }));
});
const once = (method) => new Promise((ok) => waiters.push({ method, ok }));

try {
  await send('Page.enable');
  // Reduced motion gives the settled first screen: no entrance mid-flight, no video frame.
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  mkdirSync(dest, { recursive: true });

  for (const page of pages) {
    for (const [name, [width, height]] of Object.entries(sizes)) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: name === 'phone' });
      const loaded = once('Page.loadEventFired');
      await send('Page.navigate', { url: `${site}/${page}/` });
      await loaded;
      await send('Runtime.evaluate', {
        expression: 'document.fonts.ready.then(() => new Promise((r) => setTimeout(r, 600)))',
        awaitPromise: true,
      });
      const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82 });
      writeFileSync(join(dest, `${page}-${name}.jpg`), Buffer.from(data, 'base64'));
      console.log(`public/previews/${page}-${name}.jpg`);
    }
  }
} finally {
  ws.close();
  browser.kill();
  server.close();
  await new Promise((r) => setTimeout(r, 300));
  rmSync(profile, { recursive: true, force: true });
}
