import CourseDeck from '../../components/CourseDeck';
import { FolderBack, FolderHero, Pic, TopBar } from '../../components/Folder';
import { site } from '../../lib/site';

export const metadata = { title: 'Academics' };

const facts = [
  { value: 'NC State', note: 'Home university, Raleigh' },
  { value: 'Marketing', note: 'Business major, class of [Year]' },
  { value: 'Philosophy', note: 'Minor' },
  { value: 'International studies', note: 'Minor' },
  { value: 'Seoul National University', note: 'Exchange student' },
];

const themes = [
  {
    title: 'Marketing',
    text: 'The major. How brands find an audience, earn its attention and keep it.',
    courses: '[Course name], [Course name], [Course name], [Course name]',
    where: 'NC State, [Terms]',
  },
  {
    title: 'Philosophy',
    text: 'A minor. Argument, ethics and how to weigh evidence before reaching a conclusion.',
    courses: '[Course name], [Course name], [Course name]',
    where: 'NC State, [Terms]',
  },
  {
    title: 'International studies',
    text: 'A minor. How trade, policy and culture move across borders.',
    courses: '[Course name], [Course name], [Course name]',
    where: 'NC State, [Terms]',
  },
  {
    title: 'Exchange in Seoul',
    text: 'Coursework taken on exchange at Seoul National University.',
    courses: '[Course name], [Course name], [Course name]',
    where: 'Seoul National University, [Term]',
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
          sentence="Business marketing at NC State, with minors in philosophy and international studies, and an exchange at Seoul National University."
          actions={
            <>
              <a className="btn btn-primary" href={site.resume}>Resume (PDF)</a>
              <a className="text-link" href="#coursework">Coursework by theme</a>
            </>
          }
        />

        <section className="facts section" aria-labelledby="facts-title">
          <div className="facts-top">
            <h2 id="facts-title" className="head" data-reveal>Where I study</h2>
            <p className="facts-note" data-reveal>
              My degree is at NC State in Raleigh, North Carolina. I am currently on exchange at Seoul
              National University.
            </p>
          </div>
          <dl className="facts-row">
            {facts.map((f) => (
              <div key={f.value} data-reveal>
                <dt>{f.value}</dt>
                <dd>{f.note}</dd>
              </div>
            ))}
          </dl>
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
