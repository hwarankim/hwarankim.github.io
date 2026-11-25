'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

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

// A folder opens once its top has risen this far up the screen.
const OPEN_AT = 0.62;
// A page leaves the pile when its place reaches the bottom of the screen, and has settled into
// that place by the time it has risen this much of the screen's height.
const DEAL_OVER = 0.4;

const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// One folder per workplace, lying on the desk, most recent on top. Scrolling down opens them in
// turn: a folder opens as it rises to the middle of the screen, and its papers, one page per role,
// come off the pile one at a time and settle in a single column, newest role first, like the
// entries on a resume. Nothing needs a click; the tabs still work, and jump to their folder.
export default function FolderStack({ work }) {
  // Folders open in order and stay open, so how many are open is the whole state. The page is
  // exported with every folder open (readable without JavaScript); the first measure closes the
  // ones still below the fold.
  const [count, setCount] = useState(work.length);
  const [ready, setReady] = useState(false);
  const stackRef = useRef(null);
  const countRef = useRef(work.length);
  // Folders that open above the screen (a jump, or a fling past them) open at once, and the
  // scroll position is held so the visitor's place does not move.
  const hold = useRef(null);
  const instant = useRef(false);
  const opened = useRef(0);

  const folders = () => [...(stackRef.current?.children ?? [])];

  // Each page past the first starts tucked under the one before it and slides down into its own
  // place as that place comes up the screen. Driven straight from scroll, both ways.
  const deal = useCallback(() => {
    const vh = window.innerHeight;
    const calm = still();
    folders().forEach((f) => {
      const pages = [...f.querySelectorAll('.wf-page')];
      let prev = 0;
      pages.forEach((p, k) => {
        if (k === 0) return;
        const open = f.classList.contains('is-open');
        const top = p.getBoundingClientRect().top;
        const t = calm || !open ? 1 : Math.min(1, Math.max(0, (vh - top) / (vh * DEAL_OVER)));
        // Tucked, its foot shows just below the page above; a taller page stops level with that
        // page's top instead, so it never rises out of the folder.
        const rise = Math.min(p.offsetHeight + 6, p.offsetTop - pages[k - 1].offsetTop - 10);
        const off = (1 - t) * (prev - rise);
        p.style.setProperty('--off', `${off.toFixed(1)}px`);
        p.style.setProperty('--t', t.toFixed(3));
        prev = off;
      });
    });
  }, []);

  // How many folders should be open: every one whose top has passed the line. Never fewer than
  // are open already (unless this is the first measure, closing what is still below the fold).
  const measure = useCallback((first = false) => {
    const line = window.innerHeight * OPEN_AT;
    const list = folders();
    let want = 0;
    list.forEach((f, i) => { if (f.getBoundingClientRect().top < line) want = i + 1; });
    want = Math.max(want, 1);
    if (still()) want = list.length;
    const cur = countRef.current;
    if (first ? want === cur : want <= cur) return;
    if (!first) {
      // Anything opening above the top of the screen opens at once, and the visitor stays put.
      const above = list.slice(cur, want).some((f) => f.getBoundingClientRect().top < 0);
      if (!above) {
        // A folder that is still opening has not yet pushed the next one down; let that one
        // wait its turn, so they open one at a time even on a quick scroll.
        if (performance.now() - opened.current < 640) return;
        want = cur + 1;
      } else {
        const anchor = [...stackRef.current.querySelectorAll('.wf-cover')].find((c) => c.getBoundingClientRect().top >= 0);
        hold.current = { el: anchor ?? stackRef.current, top: anchor ? anchor.getBoundingClientRect().top : stackRef.current.getBoundingClientRect().bottom, bottom: !anchor };
        instant.current = true;
      }
    }
    countRef.current = want;
    opened.current = performance.now();
    setCount(want);
  }, []);

  // After folders open: keep the visitor's place if they opened above the screen, and keep the
  // pages dealing while the folder grows.
  useLayoutEffect(() => {
    const h = hold.current;
    if (h) {
      const now = h.bottom ? h.el.getBoundingClientRect().bottom : h.el.getBoundingClientRect().top;
      window.scrollBy(0, now - h.top);
      hold.current = null;
    }
    let raf = 0;
    let settle = 0;
    if (instant.current) {
      instant.current = false;
      settle = requestAnimationFrame(() => stackRef.current?.classList.remove('is-instant'));
    }
    const end = performance.now() + 700;
    // Once it has opened, see whether the next folder has been waiting its turn.
    const loop = () => {
      deal();
      if (performance.now() < end) raf = requestAnimationFrame(loop);
      else measure();
    };
    loop();
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(settle); };
  }, [count, deal, measure]);

  // Open every folder up to this one at once, then bring it, or one of its pages, into view.
  const goTo = useCallback((i, el) => {
    const list = folders();
    if (countRef.current < i + 1) {
      instant.current = true;
      countRef.current = i + 1;
      setCount(i + 1);
    }
    // Wait out the folder's entrance (arriving on a link), or it is measured mid-slide.
    requestAnimationFrame(() => {
      const sliding = list[i]?.getAnimations?.() ?? [];
      Promise.all(sliding.map((a) => a.finished.catch(() => {}))).then(() => {
        deal();
        const target = el ?? list[i];
        target?.scrollIntoView({ block: 'start', behavior: still() ? 'auto' : 'smooth' });
      });
    });
  }, [deal]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        measure();
        deal();
      });
    };

    // Arriving on a role's link (/work-experience/#kpack, from the menu bar's outline): open the
    // folders down to that role and bring its page into view.
    const onHash = () => {
      const anchor = decodeURIComponent(window.location.hash.slice(1));
      const page = anchor && document.getElementById(anchor);
      const i = page ? folders().findIndex((f) => f.contains(page)) : -1;
      if (i === -1) return false;
      goTo(i, page);
      return true;
    };

    if (!onHash()) measure(true);
    requestAnimationFrame(() => setReady(true));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('hashchange', onHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('hashchange', onHash);
    };
  }, [measure, deal, goTo]);

  const n = Math.max(...slots.slice(0, work.length)) + 1;

  return (
    <ol ref={stackRef} className={`stack${ready ? ' is-ready' : ''}${instant.current ? ' is-instant' : ''}`} style={{ '--n': n }}>
      {work.map((w, i) => {
        const isOpen = i < count;
        const slot = slots[i] ?? i;
        const id = `folder-${i}`;
        const edge = slot === 0 ? ' wf-at-start' : slot === n - 1 ? ' wf-at-end' : '';
        return (
          <li key={w.org} className={`wf${edge}${isOpen ? ' is-open' : ''}`} style={{ '--i': i, '--slot': slot }}>
            <h2 className="wf-tabrow">
              <button type="button" className="wf-tab" aria-expanded={isOpen} aria-controls={id} onClick={() => goTo(i)}>
                {w.org}
              </button>
            </h2>
            <div className="wf-face" onClick={(e) => { if (!isOpen && !e.target.closest('a, button')) goTo(i); }}>
              <div className="wf-edges" aria-hidden="true">
                {w.roles.map((r, k) => <span key={r.title} style={{ '--k': k }} />)}
              </div>
              <div className="wf-detail" id={id} role="region" aria-label={`${w.org}, roles`}>
                <div className="wf-detail-inner">
                  <ol className="wf-pages">
                    {w.roles.map((r, k) => {
                      const line = [r.kind || w.kind, r.place || w.place].filter(Boolean).join(' · ');
                      return (
                        <li key={r.title} id={r.anchor} className="wf-page" style={{ '--k': k }}>
                          <article className="wf-sheet">
                            <header className="wf-page-head">
                              <h3>{r.title}</h3>
                              <p className="wf-page-dates">{r.dates}</p>
                              <p className="wf-page-unit">{r.unit || w.org}</p>
                              {line && <p className="wf-page-line">{line}</p>}
                            </header>
                            {r.points.length > 0 && (
                              <ul>
                                {r.points.map((p) => <li key={p}>{p}</li>)}
                              </ul>
                            )}
                          </article>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="wf-cover">
                <p className="wf-dates">{spanOf(w.roles)}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
