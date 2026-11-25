'use client';

import { useEffect, useRef } from 'react';
import { site } from '../lib/site';

// "International studies" -> "international-studies": the name a theme's link uses.
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

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
    // Arriving on a theme's link (/academics/#philosophy, from the menu bar's outline): bring that
    // card forward. The pinned deck scrolls to the card's turn; the stacked one scrolls to the card.
    const i = themes.findIndex((t) => slug(t.title) === decodeURIComponent(window.location.hash.slice(1)));
    const arrive = i === -1 ? 0 : requestAnimationFrame(() => {
      if (track.classList.contains('is-pinned')) show(i, 'auto');
      else cards[i].scrollIntoView({ block: 'start' });
    });
    mq.addEventListener('change', apply);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      mq.removeEventListener('change', apply);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(arrive);
    };
  }, []);

  // Clicking a spine, or tabbing into a covered card, scrolls the deck back to that theme.
  function show(i, behavior = 'smooth') {
    const track = trackRef.current;
    if (!track.classList.contains('is-pinned')) return;
    const run = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (run * i) / (themes.length - 1) + 2, behavior });
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
                <ul className="deck-courses">
                  {t.courses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
                <p className="deck-foot">
                  <span>{t.where}</span>
                  <a href={site.resume}>Resume (PDF)</a>
                </p>
              </li>
            ))}
          </ol>
          <p className="deck-count">
            Four themes, {themes.reduce((n, th) => n + th.courses.length, 0)} courses in all.
          </p>
        </div>
      </div>
    </section>
  );
}
