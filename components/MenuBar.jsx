'use client';

import { useEffect, useState } from 'react';
import { site } from '../lib/site';

const menus = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

// "Thu Dec 9" and "1:09 AM", in the visitor's own time zone, the way the macOS menu bar writes them.
function stamp(now) {
  const part = (opts) => new Intl.DateTimeFormat('en-US', opts).format(now);
  return {
    date: `${part({ weekday: 'short' })} ${part({ month: 'short' })} ${part({ day: 'numeric' })}`,
    time: part({ hour: 'numeric', minute: '2-digit' }),
    iso: now.toISOString(),
  };
}

// The desktop's menu bar. Only the clock is live; the menus and status icons are not controls yet.
export default function MenuBar() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    let timer = 0;
    // Tick on each new minute, so the clock turns over when the visitor's own clock does.
    const tick = () => {
      const d = new Date();
      setNow(stamp(d));
      timer = window.setTimeout(tick, 60000 - (d.getSeconds() * 1000 + d.getMilliseconds()) + 20);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="menubar" data-ui>
      <div className="menubar-left" aria-hidden="true">
        <svg className="menubar-mark" viewBox="0 0 20 20" width="18" height="18">
          <circle cx="10" cy="10" r="10" fill="currentColor" />
          <text x="10" y="10.4" textAnchor="middle" dominantBaseline="central" fill="var(--ground)" fontSize="9" fontWeight="500" letterSpacing="0.2">HK</text>
        </svg>
        <span className="menubar-app">{site.name}</span>
        {menus.map((m) => (
          <span key={m} className="menubar-menu">{m}</span>
        ))}
      </div>
      <div className="menubar-right">
        <span className="menubar-icons" aria-hidden="true">
          <svg viewBox="0 0 30 16" width="30" height="16">
            <rect x="1" y="2.5" width="24" height="11" rx="3.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <rect x="26.4" y="6" width="2" height="4" rx="1" fill="currentColor" />
            <rect x="3" y="4.5" width="15" height="7" rx="1.6" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 20 16" width="20" height="16">
            <path d="M2 6.2a11.5 11.5 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M4.9 9.1a7.4 7.4 0 0 1 10.2 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M7.8 11.9a3.2 3.2 0 0 1 4.4 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="10" cy="14" r="0.9" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 16 16" width="16" height="16">
            <circle cx="6.6" cy="6.6" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path d="M10 10l4.2 4.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 20 16" width="20" height="16">
            <rect x="1" y="1.5" width="18" height="5.5" rx="2.75" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="15.2" cy="4.25" r="1.7" fill="currentColor" />
            <rect x="1" y="9" width="18" height="5.5" rx="2.75" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <circle cx="4.8" cy="11.75" r="1.7" fill="currentColor" />
          </svg>
        </span>
        {now && (
          <time className="menubar-clock" dateTime={now.iso}>
            <span className="menubar-date">{now.date}</span>
            <span>{now.time}</span>
          </time>
        )}
      </div>
    </div>
  );
}
