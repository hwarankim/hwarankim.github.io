'use client';

import { useEffect, useRef } from 'react';
import { site } from '../lib/site';

const SLIVER = 104;
const GAP = 24;

// Signature move: the deck is pinned while the page scrolls, and each theme slides in and
// squeezes the one before it into a spine at the left. Without script, on a phone or with
// reduced motion, the same cards simply stack.
export default function CourseDeck({ themes }) {
  const trackRef = useRef(null);
  const bandRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const band = bandRef.current;
    const cards = [...band.children];
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;

    function layout() {
      frame = 0;
      if (!track.classList.contains('is-pinned')) return;
      const n = cards.length;
      const width = band.clientWidth;
      const cardW = width - (n - 1) * SLIVER;
      const rect = track.getBoundingClientRect();
      const run = track.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / run));
      const step = progress * (n - 1);
      cards.forEach((card, i) => {
        const ahead = Math.max(0, i - step);
        const x = i * SLIVER + ahead * (cardW + GAP - SLIVER);
        card.style.width = `${cardW}px`;
        card.style.transform = `translate3d(${Math.round(x)}px, 0, 0)`;
        card.classList.toggle('is-spine', i < Math.round(step));
      });
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(layout);
    }

    function apply() {
      track.classList.toggle('is-pinned', mq.matches);
      if (!mq.matches) cards.forEach((c) => { c.style.width = ''; c.style.transform = ''; });
      schedule();
    }

    apply();
    mq.addEventListener('change', apply);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      mq.removeEventListener('change', apply);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Clicking a spine, or tabbing into a covered card, scrolls the deck back to that theme.
  function show(i) {
    const track = trackRef.current;
    if (!track.classList.contains('is-pinned')) return;
    const run = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (run * i) / (themes.length - 1) + 2, behavior: 'smooth' });
  }

  return (
    <section className="deck section" id="coursework" aria-labelledby="coursework-title">
      <div className="deck-track" ref={trackRef} style={{ '--cards': themes.length }}>
        <div className="deck-stage">
          <h2 id="coursework-title" className="head" data-reveal>Coursework by theme</h2>
          <ol className="deck-band" ref={bandRef}>
            {themes.map((t, i) => (
              <li
                key={t.title}
                className="deck-card"
                style={{ '--tone': `var(--tone-${i % 4})` }}
                onClick={() => show(i)}
                onFocus={() => show(i)}
              >
                <h3>{t.title}</h3>
                <p className="deck-text">{t.text}</p>
                <p className="deck-courses">{t.courses}</p>
                <p className="deck-foot">
                  <span>{t.where}</span>
                  <a href={site.resume}>Resume (PDF)</a>
                </p>
              </li>
            ))}
          </ol>
          <p className="deck-count">
            Four themes, [Number] courses in all.
          </p>
        </div>
      </div>
    </section>
  );
}
