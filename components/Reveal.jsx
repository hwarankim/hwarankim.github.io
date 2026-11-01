'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Staggered entrance for the parts of each section: heading, then text, then picture.
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const items = [...document.querySelectorAll('[data-reveal]:not(.is-in)')];
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
