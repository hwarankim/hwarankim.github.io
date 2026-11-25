'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { aboutSite, outline, site } from '../lib/site';

// "Thu Dec 9" and "1:09:32 AM", in the visitor's own time zone, the way the macOS menu bar writes them.
// Phones show the time without seconds ("1:09 AM"), for room.
function stamp(now) {
  const part = (opts) => new Intl.DateTimeFormat('en-US', opts).format(now);
  return {
    date: `${part({ weekday: 'short' })} ${part({ month: 'short' })} ${part({ day: 'numeric' })}`,
    time: part({ hour: 'numeric', minute: '2-digit', second: '2-digit' }),
    short: part({ hour: 'numeric', minute: '2-digit' }),
    iso: now.toISOString(),
  };
}

const order = ['site', 'me', 'find'];
const beside = (id, key) => order[(order.indexOf(id) + (key === 'ArrowRight' ? 1 : order.length - 1)) % order.length];

function Mark({ size = 18 }) {
  return (
    <svg className="menubar-mark" viewBox="0 0 20 20" width={size} height={size} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <text x="10" y="10.4" textAnchor="middle" dominantBaseline="central" fill="var(--bg)" fontSize="9" fontWeight="500" letterSpacing="0.2">HK</text>
    </svg>
  );
}

// The desktop's menu bar. The HK mark and the name open real menus, the way a Mac's do:
// click or Enter to open, arrow keys to move, Esc or a click elsewhere to close.
export default function MenuBar() {
  const [now, setNow] = useState(null);
  const [open, setOpen] = useState(null);
  const [screen, setScreen] = useState({ can: false, on: false });
  const [note, setNote] = useState('');
  const barRef = useRef(null);
  const aboutRef = useRef(null);
  const triggers = useRef({});
  const menus = useRef({});
  const focusFirst = useRef(false);
  const noteTimer = useRef(0);

  useEffect(() => {
    let timer = 0;
    // Tick on each new second, so the clock turns over when the visitor's own clock does.
    const tick = () => {
      const d = new Date();
      setNow(stamp(d));
      timer = window.setTimeout(tick, 1000 - d.getMilliseconds() + 10);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  // Fullscreen follows the browser: Esc, the browser's own controls and this menu all stay in step.
  // iPhone Safari cannot put a page in fullscreen, so there the item is left out.
  useEffect(() => {
    const d = document;
    const can = Boolean(d.fullscreenEnabled || d.webkitFullscreenEnabled);
    const sync = () => setScreen({ can, on: Boolean(d.fullscreenElement || d.webkitFullscreenElement) });
    sync();
    d.addEventListener('fullscreenchange', sync);
    d.addEventListener('webkitfullscreenchange', sync);
    return () => {
      d.removeEventListener('fullscreenchange', sync);
      d.removeEventListener('webkitfullscreenchange', sync);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const away = (e) => { if (!barRef.current?.contains(e.target)) setOpen(null); };
    document.addEventListener('pointerdown', away);
    return () => document.removeEventListener('pointerdown', away);
  }, [open]);

  // A menu opened from the keyboard puts focus on its first item.
  useEffect(() => {
    if (!open || !focusFirst.current) return;
    focusFirst.current = false;
    itemsOf(open)[0]?.focus();
  }, [open]);

  useEffect(() => () => window.clearTimeout(noteTimer.current), []);

  const itemsOf = (id) => [...(menus.current[id]?.querySelectorAll('[role="menuitem"]') || [])];

  function show(id, fromKeys) {
    focusFirst.current = fromKeys;
    setOpen(id);
  }

  function close() {
    const id = open;
    setOpen(null);
    if (id) triggers.current[id]?.focus();
  }

  function onTriggerClick(e, id) {
    // A click that came from Enter or Space has no pointer position (detail 0).
    if (open === id) setOpen(null);
    else show(id, e.detail === 0);
  }

  function onTriggerKey(e, id) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      show(id, true);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = beside(id, e.key);
      triggers.current[next]?.focus();
      if (open) show(next, true);
    } else if (e.key === 'Escape' && open) {
      e.preventDefault();
      close();
    }
  }

  function onMenuKey(e, id) {
    const list = itemsOf(id);
    const i = list.indexOf(document.activeElement);
    const go = (n) => { e.preventDefault(); list[(n + list.length) % list.length]?.focus(); };
    switch (e.key) {
      case 'ArrowDown': go(i + 1); break;
      case 'ArrowUp': go(i - 1); break;
      case 'Home': go(0); break;
      case 'End': go(-1); break;
      case 'Escape': e.preventDefault(); close(); break;
      case 'ArrowLeft':
      case 'ArrowRight': {
        e.preventDefault();
        const next = beside(id, e.key);
        show(next, true);
        break;
      }
      case 'Tab': setOpen(null); break;
      default:
    }
  }

  function flash(text) {
    setNote(text);
    window.clearTimeout(noteTimer.current);
    noteTimer.current = window.setTimeout(() => setNote(''), 2800);
  }

  function aboutThisSite() {
    close();
    aboutRef.current?.showModal();
  }

  async function copyEmail() {
    close();
    let copied = false;
    try {
      await navigator.clipboard.writeText(site.email);
      copied = true;
    } catch {
      // Older browsers: copy through a hidden text field instead.
      const field = document.createElement('textarea');
      field.value = site.email;
      field.setAttribute('readonly', '');
      field.className = 'visually-hidden';
      document.body.append(field);
      field.select();
      try { copied = document.execCommand('copy'); } catch { copied = false; }
      field.remove();
    }
    flash(copied ? `Email address copied: ${site.email}` : `Email address: ${site.email}`);
  }

  function toggleFullscreen() {
    close();
    const d = document;
    const el = d.documentElement;
    const run = d.fullscreenElement || d.webkitFullscreenElement
      ? (d.exitFullscreen || d.webkitExitFullscreen)?.call(d)
      : (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
    run?.catch?.(() => {});
  }

  function trigger(id, label, children) {
    return (
      <button
        type="button"
        id={`menu-${id}`}
        ref={(el) => { triggers.current[id] = el; }}
        className={`menubar-trigger${open === id ? ' is-open' : ''}`}
        aria-haspopup="menu"
        aria-expanded={open === id}
        aria-controls={open === id ? `menu-${id}-list` : undefined}
        aria-label={label}
        onClick={(e) => onTriggerClick(e, id)}
        onKeyDown={(e) => onTriggerKey(e, id)}
        onPointerEnter={(e) => { if (open && open !== id && e.pointerType === 'mouse') show(id, false); }}
      >
        {children}
      </button>
    );
  }

  function list(id, children, extra = '') {
    if (open !== id) return null;
    return (
      <ul
        id={`menu-${id}-list`}
        ref={(el) => { menus.current[id] = el; }}
        className={`menubar-dropdown${extra}`}
        role="menu"
        aria-labelledby={`menu-${id}`}
        onKeyDown={(e) => onMenuKey(e, id)}
        // The pointer and the arrow keys share one highlight, so two items never light at once.
        onPointerOver={(e) => {
          const item = e.target.closest('[role="menuitem"]');
          if (item && e.pointerType === 'mouse' && item !== document.activeElement) item.focus({ preventScroll: true });
        }}
      >
        {children}
      </ul>
    );
  }

  // One row of the outline: a jump to a spot on a page, or a quick action run from the menu.
  function outlineRow(item) {
    const own = { role: 'menuitem', tabIndex: -1, className: 'menubar-item' };
    const body = <>{item.label}{item.hint && <span className="menubar-hint">{item.hint}</span>}</>;
    if (item.href) return <Link href={item.href} {...own} onClick={() => setOpen(null)}>{body}</Link>;
    if (item.action === 'email') return <button type="button" {...own} onClick={copyEmail}>{body}</button>;
    const linkedin = item.action === 'linkedin';
    return (
      <a href={linkedin ? site.linkedin : site.resume} target="_blank" rel={linkedin ? 'me noopener' : 'noopener'} {...own} onClick={() => setOpen(null)}>
        {body}
      </a>
    );
  }

  return (
    <div className="menubar" data-ui ref={barRef}>
      <div className="menubar-left">
        <div className="menubar-menu">
          {trigger('site', 'About this website', <Mark />)}
          {list('site', (
            <li role="none">
              <button type="button" role="menuitem" tabIndex={-1} className="menubar-item" onClick={aboutThisSite}>
                About this website
              </button>
            </li>
          ))}
        </div>

        <div className="menubar-menu">
          {trigger('me', undefined, <span className="menubar-app">{site.name}</span>)}
          {list('me', (
            <>
              <li role="none">
                <Link href="/about-me/" role="menuitem" tabIndex={-1} className="menubar-item" onClick={() => setOpen(null)}>
                  About {site.name}
                </Link>
              </li>
              <li role="none">
                <a href={site.resume} target="_blank" rel="noopener" role="menuitem" tabIndex={-1} className="menubar-item" onClick={() => setOpen(null)}>
                  Open Resume <span className="menubar-hint">PDF</span>
                </a>
              </li>
              <li role="none">
                <button type="button" role="menuitem" tabIndex={-1} className="menubar-item" onClick={copyEmail}>
                  Copy Email Address
                </button>
              </li>
              {screen.can && (
                <>
                  <li role="separator" className="menubar-rule" />
                  <li role="none">
                    <button type="button" role="menuitem" tabIndex={-1} className="menubar-item" onClick={toggleFullscreen}>
                      {screen.on ? (
                        <>Exit Fullscreen <kbd className="menubar-hint">esc</kbd></>
                      ) : (
                        <span>Enter Fullscreen <span className="menubar-hint">(for the best experience)</span></span>
                      )}
                    </button>
                  </li>
                </>
              )}
            </>
          ))}
        </div>
      </div>

      <div className="menubar-right">
        <span className="menubar-status">{site.status}</span>
        <div className="menubar-menu">
          {trigger('find', 'Jump to a section', (
            <svg className="menubar-search" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <circle cx="6.6" cy="6.6" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
              <path d="M10 10l4.2 4.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
          ))}
          {list('find', outline.map((group, g) => (
            <li key={group.heading} role="none" className="menubar-group">
              <div role="group" aria-labelledby={`outline-${g}`}>
                <p id={`outline-${g}`} className="menubar-heading">{group.heading}</p>
                <ul role="none">
                  {group.items.map((item) => <li key={item.label} role="none">{outlineRow(item)}</li>)}
                </ul>
              </div>
            </li>
          )), ' menubar-dropdown-end')}
        </div>
        {now && (
          <time className="menubar-clock" dateTime={now.iso}>
            <span className="menubar-date">{now.date}</span>
            <span className="menubar-time">{now.time}</span>
            <span className="menubar-time-short">{now.short}</span>
          </time>
        )}
      </div>

      <p className="menubar-note" role="status">{note}</p>

      <dialog
        className="about-site"
        ref={aboutRef}
        aria-labelledby="about-site-title"
        onClick={(e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
      >
        <div className="about-site-body">
          <Mark size={64} />
          <h2 id="about-site-title" className="about-site-title">{aboutSite.title}</h2>
          <p className="about-site-blurb">{aboutSite.blurb}</p>
          <dl className="about-site-specs">
            {aboutSite.specs.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <form method="dialog">
            <button type="submit" className="btn btn-secondary btn-small" autoFocus>Close</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
