'use client';

import { useEffect, useState } from 'react';

// Light and dark faces alternate so neighbouring folders never blur together.
const faces = ['kraft', 'ink', 'peri', 'paper', 'slate', 'blush', 'wash'];
// Where each tab sits across the folder, as a step from the left: shuffled by hand, so the stack
// looks dropped on the desk rather than filed.
const slots = [0, 2, 4, 3, 1, 5, 6];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const when = (d) => (d === 'Present' ? Infinity : Number(d.split(' ')[1]) * 12 + months.indexOf(d.split(' ')[0]));

// The whole time spent at a place: its earliest start to its latest end.
function spanOf(roles) {
  const starts = roles.map((r) => r.dates.split(' to ')[0]);
  const ends = roles.map((r) => r.dates.split(' to ')[1]);
  const first = starts.reduce((a, b) => (when(b) < when(a) ? b : a));
  const last = ends.reduce((a, b) => (when(b) > when(a) ? b : a));
  return `${first} to ${last}`;
}

// One folder per workplace, lying on the desk. A folder is built like a real one: the tab rises
// from the back panel, the role papers sit inside with their top edges showing, and the front
// cover carries the dates. Opening it shows the papers as a pile, one page per role, that the
// visitor leafs through: the top page goes to the back, or the back page comes to the top.
export default function FolderStack({ work }) {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  // The page being leafed: it swings out to the side first, then settles into its new place.
  // `over` keeps it above the pile on its way out (the top page going to the back).
  const [lift, setLift] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggle = (i) => {
    setOpen((cur) => (cur === i ? null : i));
    setPage(0);
    setLift(null);
  };

  const leaf = (dir, count) => {
    if (lift) return;
    const next = (page + dir + count) % count;
    setLift({ k: dir === 1 ? page : next, over: dir === 1 });
    window.setTimeout(() => {
      setPage(next);
      setLift(null);
    }, 280);
  };

  // An open folder can reach past the bottom of the screen. Once it has opened, bring the whole
  // stack into view when it fits, so every tab stays in reach; otherwise just the open folder.
  useEffect(() => {
    if (open === null) return undefined;
    const t = window.setTimeout(() => {
      const el = document.getElementById(`folder-${open}`)?.closest('.wf');
      const stack = el?.closest('.stack');
      if (!el || !stack) return;
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const target = stack.offsetHeight <= window.innerHeight ? stack : el;
      target.scrollIntoView({ block: 'nearest', behavior: still ? 'auto' : 'smooth' });
    }, 560);
    return () => window.clearTimeout(t);
  }, [open]);

  const n = Math.max(...slots.slice(0, work.length)) + 1;

  return (
    <ol className={`stack${open === null ? '' : ' has-open'}`} style={{ '--n': n }}>
      {work.map((w, i) => {
        const isOpen = open === i;
        const count = w.roles.length;
        const many = count > 1;
        const slot = slots[i] ?? i;
        const id = `folder-${i}`;
        const edge = slot === 0 ? ' wf-at-start' : slot === n - 1 ? ' wf-at-end' : '';
        const top = isOpen ? page : 0;
        return (
          <li key={w.org} className={`wf wf-${faces[i % faces.length]}${edge}${isOpen ? ' is-open' : ''}`} style={{ '--i': i, '--slot': slot }}>
            <h2 className="wf-tabrow">
              <button type="button" className="wf-tab" aria-expanded={isOpen} aria-controls={id} onClick={() => toggle(i)}>
                {w.org}
              </button>
            </h2>
            <div className="wf-face" onClick={(e) => { if (!isOpen && !e.target.closest('a, button')) toggle(i); }}>
              <div className="wf-edges" aria-hidden="true">
                {w.roles.map((r, k) => <span key={r.title} style={{ '--k': k }} />)}
              </div>
              <div className="wf-detail" id={id} role="region" aria-label={`${w.org}, roles`} inert={!isOpen} aria-hidden={!isOpen}>
                <div className="wf-detail-inner" tabIndex={isOpen ? 0 : -1}>
                  <ol className="wf-pages">
                    {w.roles.map((r, k) => {
                      // One role's dates are already on the folder's cover.
                      const line = [many && r.dates, r.kind || w.kind, r.place || w.place].filter(Boolean).join(' · ');
                      const pos = (k - top + count) % count;
                      const moving = isOpen && lift?.k === k ? ` is-lifted${lift.over ? ' is-over' : ''}` : '';
                      return (
                        <li
                          key={r.title}
                          className={`wf-page${moving}`}
                          style={{ '--pos': pos }}
                          inert={pos !== 0}
                          aria-hidden={pos !== 0}
                        >
                          <div className="wf-page-head">
                            <h3>{r.title}</h3>
                            {r.unit && <p className="wf-page-unit">{r.unit}</p>}
                            {line && <p className="wf-page-line">{line}</p>}
                          </div>
                          {r.points.length > 0 && (
                            <ul>
                              {r.points.map((p) => <li key={p}>{p}</li>)}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="wf-cover">
                <p className="wf-dates">{spanOf(w.roles)}</p>
                {isOpen && many && (
                  <div className="wf-pager">
                    <button type="button" onClick={() => leaf(-1, count)}>Previous</button>
                    <span aria-live="polite">Page {page + 1} of {count}</span>
                    <button type="button" onClick={() => leaf(1, count)}>Next page</button>
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
