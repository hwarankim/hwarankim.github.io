import { FolderBack, FolderHero, Pic, TopBar } from '../../components/Folder';
import { site } from '../../lib/site';

export const metadata = { title: 'Work experience' };

// Every role is a placeholder until hwaran confirms the details.
const roles = [
  { role: '[Role]', employer: '[Employer]', city: '[City]', dates: '[Dates]', kind: '[Marketing, research or other]', tone: 'kraft', tab: 'wash' },
  { role: '[Role]', employer: '[Employer]', city: '[City]', dates: '[Dates]', kind: '[Marketing, research or other]', tone: 'wash', tab: 'kraft' },
  { role: '[Role]', employer: '[Employer]', city: '[City]', dates: '[Dates]', kind: '[Marketing, research or other]', tone: 'bone', tab: 'wash' },
];

const skills = [
  { name: 'Marketing', kind: 'Discipline', level: 'Major, NC State' },
  { name: 'Philosophy', kind: 'Discipline', level: 'Minor, NC State' },
  { name: 'International studies', kind: 'Discipline', level: 'Minor, NC State' },
  { name: '[Language]', kind: 'Language', level: '[Level]' },
  { name: '[Language]', kind: 'Language', level: '[Level]' },
  { name: '[Software or platform]', kind: 'Tool', level: '[Level]' },
  { name: '[Software or platform]', kind: 'Tool', level: '[Level]' },
  { name: '[Analytics tool]', kind: 'Tool', level: '[Level]' },
];

export default function WorkExperience() {
  return (
    <>
      <TopBar current="/work-experience/" />
      <main>
        <FolderHero
          title="Work experience"
          bg="raleigh"
          tone="wash"
          sentence="My work so far, filed one folder per job, with the details on my resume."
          actions={
            <>
              <a className="btn btn-primary" href={site.linkedin} rel="me noopener" target="_blank">LinkedIn</a>
              <a className="text-link" href={site.resume}>Resume (PDF)</a>
            </>
          }
        />

        <section className="jobs section" aria-labelledby="jobs-title">
          <h2 id="jobs-title" className="head" data-reveal>Experience</h2>
          <ol className="jobs-stack">
            {roles.map((r, i) => (
              <li key={i} className={`job job-${r.tone}`} style={{ '--i': i }}>
                <div className="job-strip">
                  <h3 className={`job-tab job-tab-${r.tab}`}>{r.role}</h3>
                </div>
                <div className="job-body">
                  <div className="job-who" data-reveal>
                    <p className="job-employer">{r.employer}</p>
                    <p>{r.city}</p>
                    <p>{r.dates}</p>
                    <p>{r.kind}</p>
                  </div>
                  <div className="job-what" data-reveal>
                    <p>[One sentence on what the team does and who it serves.]</p>
                    <ul>
                      <li>[What you did, and what changed because of it.]</li>
                      <li>[A second responsibility, with its result.]</li>
                      <li>[A tool, market or audience you worked with.]</li>
                    </ul>
                    <a className="text-link" href={`mailto:${site.email}?subject=${encodeURIComponent('About your role at [Employer]')}`}>
                      Ask me about this role
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="skills section" aria-labelledby="skills-title">
          <div className="skills-list">
            <h2 id="skills-title" className="head" data-reveal>Skills and tools</h2>
            <table data-reveal>
              <caption className="visually-hidden">Skills, what kind each is, and level</caption>
              <thead className="visually-hidden">
                <tr><th scope="col">Skill</th><th scope="col">Kind</th><th scope="col">Level or source</th></tr>
              </thead>
              <tbody>
                {skills.map((s, i) => (
                  <tr key={i}>
                    <th scope="row">{s.name}</th>
                    <td>{s.kind}</td>
                    <td>{s.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pic name="jongno" className="skills-pic" />
        </section>
      </main>
      <FolderBack current="/work-experience/" stamp="ddp" credits={['raleigh', 'jongno']} />
    </>
  );
}
