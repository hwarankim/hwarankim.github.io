'use client';

import { site } from '../lib/site';

// There is no form backend on GitHub Pages, so the coupon opens the visitor's own email app with
// the note already written. Without script the form still submits as a plain mailto.
export default function Coupon() {
  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') || '';
    const org = data.get('org') || '';
    const subject = org ? `Hello from ${name} at ${org}` : `Hello from ${name}`;
    const body = `${data.get('message') || ''}\n\n${name}${org ? `, ${org}` : ''}\n${data.get('reply') || ''}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="coupon-wrap section" id="write" aria-labelledby="write-title">
      <div className="coupon" data-reveal>
        <div className="coupon-left">
          <h2 id="write-title" className="head">Write to me</h2>
          <p>Roles, projects, courses or questions about East Asian markets are all welcome.</p>
        </div>
        <div className="coupon-perf" aria-hidden="true" />
        <form className="coupon-form" action={`mailto:${site.email}`} method="post" encType="text/plain" onSubmit={onSubmit}>
          <label className="visually-hidden" htmlFor="c-name">Your name</label>
          <input id="c-name" name="name" autoComplete="name" placeholder="Your name" required />
          <label className="visually-hidden" htmlFor="c-org">Organisation</label>
          <input id="c-org" name="org" autoComplete="organization" placeholder="Organisation" />
          <label className="visually-hidden" htmlFor="c-reply">Your email</label>
          <input id="c-reply" name="reply" type="email" autoComplete="email" placeholder="Your email" />
          <label className="visually-hidden" htmlFor="c-message">Message</label>
          <textarea id="c-message" name="message" rows="3" placeholder="Message" required />
          <button className="btn btn-primary btn-block" type="submit">Open in your email app</button>
        </form>
      </div>
    </section>
  );
}
