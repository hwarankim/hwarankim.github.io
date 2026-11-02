import { BinderClip, CoffeeRing, Envelope, Eraser, Marker, Mug, PaperClip, Pencil, Ruler } from '../../components/DeskThings';
import FolderStack from '../../components/FolderStack';
import { TopBar } from '../../components/Folder';
import { site } from '../../lib/site';
import { work } from '../../lib/work';

export const metadata = { title: 'Work experience' };

// The page is a desk. The title sheet and a sticky note stick out from under the top folder,
// the folders lie in the middle, and more paper, a mug and odds and ends are scattered around.
export default function WorkExperience() {
  return (
    <>
      <TopBar current="/work-experience/" />
      <main className="worktop">
        <section className="loose loose-title" aria-labelledby="page-title">
          <PaperClip className="desk-clip" id="clip-title" />
          <h1 id="page-title">Work Experience</h1>
        </section>
        <p className="loose loose-note">
          Paper grain from{' '}
          <a href="https://commons.wikimedia.org/wiki/File:Kraft_tileable_1024x1024.png">Kraft tileable</a>{' '}
          by Coyau, public domain.
        </p>
        <CoffeeRing className="desk-thing desk-ring" />
        <Pencil className="desk-thing desk-pencil" />
        <Eraser className="desk-thing desk-eraser" />
        <PaperClip className="desk-thing desk-clip-loose" id="clip-loose" />

        <FolderStack work={work} />

        <Envelope className="desk-thing desk-envelope" />
        <div className="loose loose-graph" aria-hidden="true">
          <BinderClip className="desk-binder" />
        </div>
        <div className="loose loose-ruled" aria-hidden="true" />
        <p className="loose loose-card">
          <span className="loose-card-name">{site.name}</span>
          <span>{site.role}</span>
          <a href={site.linkedin} rel="me noopener" target="_blank">linkedin.com/in/hwaran-kim</a>
        </p>
        <PaperClip className="desk-thing desk-clip-card" id="clip-card" />
        <Mug className="desk-thing desk-mug" />
        <Ruler className="desk-thing desk-ruler" />
        <Marker className="desk-thing desk-marker" />
      </main>
    </>
  );
}
