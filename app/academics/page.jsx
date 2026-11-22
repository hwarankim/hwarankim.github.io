import CourseDeck from '../../components/CourseDeck';
import { FolderBack, FolderHero, Pic, TopBar } from '../../components/Folder';
import { site } from '../../lib/site';

export const metadata = { title: 'Academics' };

const facts = [
  { value: 'NC State', note: 'Home university, Raleigh' },
  { value: 'Marketing', note: 'Business major, class of 2027' },
  { value: 'Philosophy', note: 'Minor' },
  { value: 'International studies', note: 'Minor' },
  { value: 'Seoul National University', note: 'Exchange student' },
];

const themes = [
  {
    title: 'Marketing',
    text: 'The major. How brands find an audience, earn its attention and keep it.',
    courses: [
      'Marketing Methods',
      'Consumer Behavior (upcoming, Spring 2027)',
      'Professional Selling (upcoming, Spring 2027)',
      'Marketing Research (upcoming, Spring 2027)',
    ],
    where: 'NC State, Fall 2026 – Spring 2027',
  },
  {
    title: 'Philosophy',
    text: 'A minor. Argument, ethics and how to weigh evidence before reaching a conclusion.',
    courses: ['Contemporary Moral Issues', 'Knowledge and Skepticism', 'Philosophy of Law'],
    where: 'NC State, Spring 2025 – Spring 2027',
  },
  {
    title: 'International studies',
    text: 'A minor. How trade, policy and culture move across borders.',
    courses: ['Intro to International Studies', 'International Law', 'Theories of Globalization'],
    where: 'NC State, Spring 2024 – Spring 2027',
  },
  {
    title: 'Exchange in Seoul',
    text: 'Coursework taken on exchange at Seoul National University.',
    courses: [
      'Korean Literature in a Global Context',
      'Human Rights, NGO, and International Community',
      'Life in Contemporary Korea',
      'Understanding Asian Philosophy',
    ],
    where: 'Seoul National University, Fall 2026',
  },
];

export default function Academics() {
  return (
    <>
      <TopBar current="/academics/" />
      <main>
        <FolderHero
          title="Academics"
          bg="snuGate"
          sentence="Business marketing student on a long-term pre-law track, with a specialty interest in East Asia."
          actions={
            <>
              <a className="btn btn-primary" href={site.resume}>Resume (PDF)</a>
              <a className="text-link" href="#coursework">Coursework by theme</a>
            </>
          }
        />

        <section className="facts section" aria-labelledby="facts-title">
          <h2 id="facts-title" className="visually-hidden">Academic background</h2>
          <dl className="facts-row">
            {facts.map((f) => (
              <div key={f.value} data-reveal>
                <dt>{f.value}</dt>
                <dd>{f.note}</dd>
              </div>
            ))}
          </dl>
          <div className="facts-essay" data-reveal>
            <p>
              With my philosophy and international studies minors, I&rsquo;ve been able to adopt a
              specialized focus into the underlying frameworks that govern global society, while my
              business marketing major provides the technical skills required to navigate the
              marketplace. I found myself yearning for perspectives from outside a Western lens
              after taking courses like Social Deviance and Intro to International Studies. So, a
              five-week language program at Yonsei University in 2023 was the first attempt at
              that, and Seoul National University has gone further to shape my own cultural
              identity.
            </p>
            <p>
              Being a foreigner to a familiar country has put me on the other side of the same
              frameworks I help students navigate at NC State&rsquo;s Office of International
              Services. There, I&rsquo;ve had a front-row seat to how a shift in federal policy
              lands on real people; here, dual citizenship landed me in a kind of administrative
              purgatory, where my Korean passport disqualified me from what exchange students
              receive and the lack of a resident registration number ruled out the rest.
              I&rsquo;m left with more questions about the US and East Asia than answers to back
              them up. I don&rsquo;t expect law school to answer all of them, but it&rsquo;s where
              I plan to start.
            </p>
          </div>
          <div className="facts-pics">
            <Pic name="belltower" className="facts-pic-a" />
            <Pic name="winston" className="facts-pic-b" />
          </div>
        </section>

        <CourseDeck themes={themes} />
      </main>
      <FolderBack current="/academics/" stamp="bukchon" credits={['snuGate', 'belltower', 'winston']} />
    </>
  );
}
