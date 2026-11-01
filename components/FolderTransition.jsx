'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Folder art is 512 x 416. The bone sheet inside it (x 40-472, y 76-392) is the paper that grows
// to fill the screen, in the same colour as every subpage's ground.
const ART_W = 512;
const PAPER = { x: 40, y: 76, w: 432, h: 316 };
const HINGE = '50% 95%';

const strip = (p) => p.replace(/\/+$/, '') || '/';

// The subpage's own first screen, printed on the paper (made by scripts/previews.mjs).
export const previewFor = (href, width) =>
  `/previews/${strip(href).slice(1)}-${width < 768 ? 'phone' : 'desktop'}.jpg`;

// Lives in the root layout, so it survives the route change: the folder opens on the desktop,
// the paper covers the screen, the next page renders underneath, and the paper lifts away.
export default function FolderTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const stageRef = useRef(null);
  const folderRef = useRef(null);
  const frontRef = useRef(null);
  const previewRef = useRef(null);
  const state = useRef({ running: false, target: null, source: null, fallback: 0 });

  useEffect(() => {
    function onOpen(e) {
      const s = state.current;
      e.preventDefault(); // tells the desktop the transition has taken the click
      if (s.running) return;
      s.running = true;
      play(e.detail).catch(() => { window.location.href = e.detail.href; });
    }

    async function play({ href, rect, source }) {
      const s = state.current;
      const stage = stageRef.current;
      const folder = folderRef.current;
      const front = frontRef.current;
      const W = window.innerWidth;
      const H = window.innerHeight;

      const k0 = rect.width / ART_W;
      const k1 = Math.min(W * 0.62 / ART_W, H * 0.5 / 416);
      const k2 = Math.max(W / PAPER.w, H / PAPER.h) * 1.04;
      const at = (k, cx, cy) => `translate(${cx}px, ${cy}px) scale(${k})`;
      const t0 = at(k0, rect.left, rect.top);
      const t1 = at(k1, W / 2 - (ART_W / 2) * k1, H / 2 - 208 * k1);
      const t2 = at(k2, W / 2 - (PAPER.x + PAPER.w / 2) * k2, H / 2 - (PAPER.y + PAPER.h / 2) * k2);

      // Sized so that when the paper fills the screen, the screenshot sits exactly where the
      // real page will appear, and the hand-over reads as one continuous zoom.
      const preview = previewRef.current;
      const pw = W / k2;
      const ph = H / k2;
      preview.src = previewFor(href, W);
      Object.assign(preview.style, {
        left: `${PAPER.x + PAPER.w / 2 - pw / 2}px`,
        top: `${PAPER.y + PAPER.h / 2 - ph / 2}px`,
        width: `${pw}px`,
        height: `${ph}px`,
      });

      s.target = strip(href);
      s.source = source;
      router.prefetch(href);
      folder.style.transform = t0;
      front.style.transform = 'perspective(1400px) rotateX(0deg)';
      front.style.opacity = '1';
      stage.style.opacity = '1';
      stage.hidden = false;
      source.style.visibility = 'hidden';

      const easeOut = 'cubic-bezier(0.2, 0.7, 0.2, 1)';
      const easeInOut = 'cubic-bezier(0.7, 0, 0.3, 1)';
      const lift = folder.animate(
        [
          { transform: t0, easing: easeOut },
          { transform: t1, offset: 0.34, easing: 'linear' },
          { transform: t1, offset: 0.5, easing: easeInOut },
          { transform: t2 },
        ],
        { duration: 1250, fill: 'forwards' },
      );
      front.animate(
        [
          { transform: 'perspective(1400px) rotateX(0deg)', opacity: 1 },
          { transform: 'perspective(1400px) rotateX(0deg)', opacity: 1, offset: 0.3, easing: 'cubic-bezier(0.5, 0, 0.75, 0)' },
          { transform: 'perspective(1400px) rotateX(-86deg)', opacity: 1, offset: 0.62 },
          { transform: 'perspective(1400px) rotateX(-96deg)', opacity: 0, offset: 0.74 },
          { transform: 'perspective(1400px) rotateX(-96deg)', opacity: 0 },
        ],
        { duration: 1250, fill: 'forwards' },
      );
      await lift.finished;

      // The page arrives already settled, matching the screenshot it is replacing.
      document.documentElement.classList.add('via-folder');
      router.push(href);
      // If the page never arrives (offline, a broken route), fall back to a plain load.
      s.fallback = window.setTimeout(() => { window.location.href = href; }, 4000);
    }

    window.addEventListener('folder:open', onOpen);
    return () => window.removeEventListener('folder:open', onOpen);
  }, [router]);

  // The new page is in place under the paper: lift the paper away and reset.
  useEffect(() => {
    const s = state.current;
    if (!s.running) {
      // Any later page change plays its usual entrance again.
      document.documentElement.classList.remove('via-folder');
      return;
    }
    if (strip(pathname) !== s.target) return;
    window.clearTimeout(s.fallback);
    const stage = stageRef.current;
    const fade = stage.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 420, delay: 60, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', fill: 'forwards',
    });
    fade.finished.then(() => {
      stage.hidden = true;
      stage.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      if (s.source) s.source.style.visibility = '';
      s.running = false;
      s.target = null;
      s.source = null;
    });
  }, [pathname]);

  return (
    <div className="folder-stage" ref={stageRef} hidden aria-hidden="true">
      <div className="folder-stage-art" ref={folderRef}>
        <img src="/folder-back.svg" alt="" width="512" height="416" />
        <img className="folder-stage-preview" ref={previewRef} alt="" decoding="sync" />
        <img className="folder-stage-front" ref={frontRef} src="/folder-front.svg" alt="" width="512" height="416" style={{ transformOrigin: HINGE }} />
      </div>
    </div>
  );
}
