import { FolderBack, FolderHero, TopBar } from '../../components/Folder';
import { pictures } from '../../lib/site';

export const metadata = { title: 'Extra' };

// General descriptions of each market. hwaran's own read on each one is a placeholder.
const markets = [
  {
    pic: 'bund', market: 'Livestream commerce', country: 'China',
    text: 'Hosts sell on live video, answer questions as they come in and change prices on air. The stream is the shop window and the checkout at once.',
  },
  {
    pic: 'shinjuku', market: 'Entertainment', country: 'Japan',
    text: 'Anime, games, music and idols are licensed into products, cafés and collaborations, so a fan base becomes a market for other brands.',
  },
  {
    pic: 'ddp', market: 'Technology', country: 'South Korea',
    text: 'Korean electronics makers and platforms shape how people shop, pay and message, at home and in the markets they export to.',
  },
  {
    pic: 'cosmetics', market: 'Skincare', country: 'South Korea',
    text: 'Korean skincare sells on routine and ingredient, and it travels abroad through retailers, reviews and short video.',
  },
  {
    pic: 'merch', market: 'K-pop', country: 'South Korea',
    text: 'Fandoms organise around releases and tours, and brands buy into that calendar with endorsements, pop-ups and limited editions.',
  },
];

const notes = [
  { topic: 'Skincare', h: 44 },
  { topic: 'K-pop', h: 34 },
  { topic: 'Korean tech', h: 40 },
  { topic: 'Livestream commerce', h: 30 },
  { topic: 'Japanese entertainment', h: 38 },
  { topic: 'Seoul National University', h: 32 },
];

export default function Extra() {
  const v = pictures.seoulStreet;
  return (
    <>
      <TopBar current="/extra/" />
      <main>
        <FolderHero
          title="Extra"
          bg="namsan"
          tone="kraft"
          sentence="The East Asian markets I follow, and notes from my exchange in Seoul."
          actions={
            <>
              <a className="btn btn-primary" href="#markets">Market by market</a>
              <a className="text-link" href="#seoul">Notes from Seoul</a>
            </>
          }
        />

        <section className="markets section" id="markets" aria-labelledby="markets-title">
          <h2 id="markets-title" className="head" data-reveal>East Asia, market by market</h2>
          <ul className="markets-grid">
            {markets.map((m, i) => {
              const p = pictures[m.pic];
              return (
                <li key={m.market} className={`market market-${i}`} data-reveal style={{ '--d': `${i * 70}ms` }}>
                  <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
                  <div className="market-strip">
                    <h3>
                      <span>{m.market}</span>
                      <span>{m.country}</span>
                    </h3>
                    <p>{m.text}</p>
                    <p className="market-mine">My read: [Your note on this market.]</p>
                    <p className="market-cap">{p.caption}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="seoul" id="seoul" aria-labelledby="seoul-title">
          <video className="seoul-film" autoPlay muted loop playsInline preload="metadata" poster={v.poster} width={v.w} height={v.h} aria-hidden="true">
            <source src={v.src} type="video/webm" />
          </video>
          <div className="seoul-copy">
            <h2 id="seoul-title" className="head">Notes from Seoul</h2>
            <p>
              Notes from my exchange at Seoul National University, on where brands show up in the city.
            </p>
            <p className="seoul-caption">Film: {v.caption}</p>
          </div>
          <ul className="slips">
            {notes.map((n, i) => (
              <li key={n.topic} className="slip" style={{ '--h': `${n.h}svh`, '--tilt': i % 3 === 1 ? '-1.5deg' : i % 3 === 2 ? '1deg' : '0deg' }}>
                <p className="slip-head">{n.topic}</p>
                <p aria-hidden="true">. . . . . . . . . .</p>
                <p>[Place in Seoul]</p>
                <p>[Date]</p>
                <p>[What you noticed]</p>
                <p>[What a brand could learn]</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <FolderBack current="/extra/" stamp="hanRiver" credits={['namsan', 'bund', 'shinjuku', 'ddp', 'cosmetics', 'merch', 'seoulStreet']} />
    </>
  );
}
