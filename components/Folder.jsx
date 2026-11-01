import { folders, pictures, site } from '../lib/site';

// The pieces every opened folder shares: the bar back to the desktop, the folder sheet that opens
// each page, a captioned picture, and the back of the folder as the footer.

export function TopBar({ current }) {
  return (
    <header className="bar">
      <a className="bar-back" href="/">
        <img src="/folder.png" alt="" width="512" height="416" />
        <span>Back to desktop</span>
      </a>
      <nav className="bar-nav" aria-label="Folders">
        <ul>
          {folders.map((f) => (
            <li key={f.href}>
              <a href={f.href} aria-current={f.href === current ? 'page' : undefined}>
                {f.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="btn btn-primary btn-small" href={site.linkedin} rel="me noopener" target="_blank">
        LinkedIn
      </a>
    </header>
  );
}

export function FolderHero({ title, sentence, bg, tone = 'kraft', actions, children }) {
  const p = pictures[bg];
  return (
    <section className="hero" aria-labelledby="page-title">
      <img className="hero-bg" src={p.src} alt={p.alt} width={p.w} height={p.h} fetchPriority="high" />
      <div className={`sheet sheet-${tone}`}>
        <div className="sheet-tab">
          <h1 id="page-title">{title}</h1>
        </div>
        <div className="sheet-body">
          <div className="sheet-text">
            <p className="lead">{sentence}</p>
            {children}
            <div className="actions">{actions}</div>
          </div>
          <img className="sheet-folder" src="/folder.png" alt="" width="512" height="416" />
        </div>
      </div>
      <p className="hero-caption">{p.caption}</p>
    </section>
  );
}

export function Pic({ name, className = '', sizes, eager = false }) {
  const p = pictures[name];
  return (
    <figure className={`pic ${className}`} data-reveal>
      <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading={eager ? undefined : 'lazy'} decoding="async" sizes={sizes} />
      <figcaption>{p.caption}</figcaption>
    </figure>
  );
}

function Scallops() {
  const n = 12;
  const w = 1200 / n;
  let d = 'M0 50';
  for (let i = 0; i < n; i += 1) d += ` A${w / 2} ${w / 2} 0 0 1 ${(i + 1) * w} 50`;
  d += ' Z';
  return (
    <svg className="scallops" viewBox="0 0 1200 50" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function FolderBack({ current, stamp, credits }) {
  const s = pictures[stamp];
  const others = folders.filter((f) => f.href !== current);
  return (
    <footer className="back" aria-labelledby="back-title">
      <Scallops />
      <div className="back-panel">
        <div className="back-message" data-reveal>
          <h2 id="back-title">Thanks for looking</h2>
          <p>
            Three more are waiting on the desktop. If you would like to talk about marketing, East Asian
            markets or anything in these folders, LinkedIn and email both reach me.
          </p>
          <ul className="back-folders">
            {others.map((f) => (
              <li key={f.href}>
                <a href={f.href}>{f.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="back-address" data-reveal>
          <figure className="stamp">
            <img src={s.src} alt={s.alt} width={s.w} height={s.h} loading="lazy" />
          </figure>
          <ul>
            <li><a href={site.linkedin} rel="me noopener" target="_blank">LinkedIn</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a href={site.resume}>Resume (PDF)</a></li>
            <li><a href="/">Back to desktop</a></li>
          </ul>
        </div>
        <p className="imprint">
          © 2026 hwaran kim. Pictures from Wikimedia Commons:{' '}
          {[stamp, ...credits.filter((c) => c !== stamp)].map((key, i, all) => {
            const c = pictures[key].credit;
            return (
              <span key={key}>
                <a href={c.page}>{c.title}</a> by {c.creator}, {c.licence}
                {i < all.length - 1 ? '; ' : '.'}
              </span>
            );
          })}
        </p>
      </div>
    </footer>
  );
}
