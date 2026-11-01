'use client';

import { useEffect, useRef } from 'react';
import { folders, site } from '../lib/site';
import { previewFor } from './FolderTransition';
import MenuBar from './MenuBar';

// The live thing: on a wide screen with a mouse, folders can be dragged around the desktop.
// A plain click, a tap or Enter still opens them, because each folder is an ordinary link.
export default function Desktop() {
  const deskRef = useRef(null);
  const drag = useRef(null);
  const offsets = useRef({});
  const justDragged = useRef(false);

  // Fetch the screenshots printed on each folder's paper before anyone clicks.
  useEffect(() => {
    folders.forEach((f) => { new Image().src = previewFor(f.href, window.innerWidth); });
  }, []);

  function onPointerDown(e) {
    if (e.pointerType !== 'mouse' || e.button !== 0 || window.innerWidth < 1200) return;
    const el = e.currentTarget;
    const key = el.dataset.folder;
    const start = offsets.current[key] || { x: 0, y: 0 };
    const desk = deskRef.current.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    drag.current = {
      el, key, start, moved: false,
      px: e.clientX, py: e.clientY,
      // how far the folder may travel before it leaves the desktop
      minX: start.x - (box.left - desk.left) + 8,
      maxX: start.x + (desk.right - box.right) - 8,
      minY: start.y - (box.top - desk.top) + 32,
      maxY: start.y + (desk.bottom - box.bottom) - 8,
    };
  }

  function onPointerMove(e) {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.px;
    const dy = e.clientY - d.py;
    if (!d.moved && Math.hypot(dx, dy) < 6) return;
    if (!d.moved) {
      d.moved = true;
      d.el.setPointerCapture(e.pointerId);
      d.el.classList.add('is-dragging');
    }
    const x = Math.min(d.maxX, Math.max(d.minX, d.start.x + dx));
    const y = Math.min(d.maxY, Math.max(d.minY, d.start.y + dy));
    offsets.current[d.key] = { x, y };
    d.el.style.translate = `${x}px ${y}px`;
  }

  function onPointerUp() {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.moved) return;
    d.el.classList.remove('is-dragging');
    justDragged.current = true;
  }

  function onClick(e) {
    if (justDragged.current) {
      justDragged.current = false;
      e.preventDefault();
      return;
    }
    // A new-tab click, or a visitor who asked for less motion, gets the plain link.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const link = e.currentTarget;
    const icon = link.querySelector('img');
    const open = new CustomEvent('folder:open', {
      cancelable: true,
      detail: { href: link.getAttribute('href'), rect: icon.getBoundingClientRect(), source: icon },
    });
    // The transition cancels the event when it takes over; otherwise the link just navigates.
    if (!window.dispatchEvent(open)) e.preventDefault();
  }

  return (
    <main className="desk" ref={deskRef}>
      <MenuBar />
      <div className="desk-grid">
        <div className="desk-intro">
          <h1 className="desk-name">{site.name}</h1>
          <p className="desk-role">{site.role}</p>
          <p className="desk-lead">{site.intro}</p>
          <div className="actions">
            <a className="btn btn-primary" href={site.linkedin} rel="me noopener" target="_blank">
              LinkedIn
            </a>
            <a className="btn btn-secondary" href={site.resume}>
              Resume (PDF)
            </a>
          </div>
        </div>

        <figure className="desk-photo">
          <img src="/hero-cutout.png" alt="Full-length photo of hwaran kim" width="800" height="1800" />
        </figure>

        <nav className="desk-folders" aria-label="Folders">
          <ul>
            {folders.map((f, i) => (
              <li key={f.href} style={{ '--i': i }}>
                <a
                  className="folder"
                  href={f.href}
                  data-folder={f.label}
                  draggable="false"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  onClick={onClick}
                >
                  <img src="/folder.png" alt="Folder" width="512" height="416" draggable="false" />
                  <span className="folder-label">{f.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
