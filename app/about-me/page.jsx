import Coupon from '../../components/Coupon';
import { FolderBack, FolderHero, Pic, TopBar } from '../../components/Folder';
import { site } from '../../lib/site';

export const metadata = { title: 'About me' };

export default function AboutMe() {
  return (
    <>
      <TopBar current="/about-me/" />
      <main>
        <FolderHero
          title="About me"
          bg="hanRiver"
          tone="bone"
          sentence="Marketing first, then law school. A short note on who I am and where I am headed."
          actions={
            <>
              <a className="btn btn-primary" href="#write">Write to me</a>
              <a className="text-link" href={site.resume}>Resume (PDF)</a>
            </>
          }
        />

        <section className="letter section" aria-labelledby="letter-title">
          <Pic name="belltower" className="letter-plate letter-plate-a" />
          <article className="letter-sheet">
            <h2 id="letter-title" className="letter-title" data-reveal>A note from me</h2>
            <p data-reveal style={{ '--d': '70ms' }}>
              Hello! Thank you for checking out my website. My name is Hwaran Kim, and I study
              business marketing at NC State, with minors in philosophy and international studies.
              I am currently on exchange at Seoul National University, and have been able to take a
              firsthand perspective on some of East Asia&rsquo;s fastest-growing industries.
            </p>
            <p data-reveal style={{ '--d': '140ms' }}>
              Some of these industries include livestream selling in China, entertainment in Japan,
              technology in South Korea, and the skincare and K-pop industries that carry Korean
              brands to the rest of the world.
            </p>
            <p data-reveal style={{ '--d': '210ms' }}>
              I&rsquo;m determined to start my career in marketing, where I can gain real-world
              experience and broaden my perspective before going on to law school.
            </p>
            <p data-reveal style={{ '--d': '0ms' }}>
              If you work on brands that move between Korea, East Asia and the US, I&rsquo;d be happy
              to talk!
            </p>
            <p className="letter-sign" data-reveal>{site.name}</p>
            <p className="letter-role">{site.role}</p>
            <div className="letter-stub" data-reveal>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a className="btn btn-primary" href={site.linkedin} rel="me noopener" target="_blank">LinkedIn</a>
            </div>
          </article>
          <Pic name="snuGate" className="letter-plate letter-plate-b" />
        </section>

        <Coupon />
      </main>
      <FolderBack current="/about-me/" stamp="namsan" credits={['hanRiver', 'belltower', 'snuGate']} />
    </>
  );
}
