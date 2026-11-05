import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ImageIcon } from "lucide-react";
import type { Expertise, Project } from "@/data/portfolio";
import { ImageLightbox } from "./ImageLightbox";
import { ProjectVisual } from "./PortfolioSections";

function DetailSection({ number, label, title, children }: { number: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="detail-section" aria-labelledby={`detail-${number}`}>
      <div className="detail-section-head">
        <p className="section-index">{number} / {label}</p>
        <h2 id={`detail-${number}`}>{title}</h2>
      </div>
      <div className="detail-section-body">{children}</div>
    </section>
  );
}

function Pending({ children }: { children: React.ReactNode }) {
  return <p className="empty-note">{children}</p>;
}

export function ProjectDetail({ expertise, project }: { expertise: Expertise; project: Project }) {
  const base = `/${expertise.id}`;
  const index = expertise.projects.findIndex(item => item.slug === project.slug);
  const previous = expertise.projects[index - 1];
  const next = expertise.projects[index + 1];
  const study = project.caseStudy ?? {};
  const planned = project.kind === "planned";
  const gallery = study.gallery ?? [];

  return (
    <article className="detail-page page-shell">
      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <Link href={`${base}/`}>{expertise.label}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`${base}/#projects`}>Projects</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.name}</span>
      </nav>

      <header className="detail-hero">
        <div className="detail-intro">
          <span className="project-status">{project.status}</span>
          <h1 id="project-title" tabIndex={-1}>{project.name}</h1>
          <p className="detail-lead">{project.description}</p>
          {project.stack.length > 0 && <div className="tags" aria-label="Technology stack">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>}
          <div className="detail-actions">
            {project.demo && <a className="button button-primary" href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight aria-hidden="true" /></a>}
            {project.github ? <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer">Source code <ArrowUpRight aria-hidden="true" /></a> : <span className="button button-unavailable">Repository to be added</span>}
            {!project.demo && <span className="button button-unavailable">No public demo</span>}
          </div>
        </div>
        <div className="project-visual detail-visual">
          <ProjectVisual project={project} caption="COVER IMAGE TO BE ADDED" sizes="(max-width: 900px) 100vw, 45vw" />
        </div>
      </header>

      <DetailSection number="01" label="BACKGROUND" title="Why I built this.">
        {study.why ? <p className="detail-prose">{study.why}</p> : <Pending>The story behind this project, the problem it addresses and why it matters to me, is yet to be added.</Pending>}
      </DetailSection>

      <DetailSection number="02" label="SOLUTION" title={planned ? "What I plan to build." : "What I built."}>
        {study.solution && <p className="detail-prose">{study.solution}</p>}
        <p className="eyebrow detail-list-label">{planned ? "PLANNED SCOPE" : "KEY CAPABILITIES"}</p>
        <ul className="detail-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      </DetailSection>

      <DetailSection number="03" label="USAGE" title="How to use it.">
        {study.usage?.length ? (
          <ol className="detail-steps">{study.usage.map(step => <li key={step}>{step}</li>)}</ol>
        ) : planned ? (
          <Pending>Not available yet. Usage instructions will be written once the project is built.</Pending>
        ) : (
          <Pending>A step-by-step usage guide is yet to be added.{project.demo ? " In the meantime, the live demo is available above." : ""}</Pending>
        )}
      </DetailSection>

      <DetailSection number="04" label="GALLERY" title="A closer look.">
        {gallery.length ? (
          <ul className="gallery-grid">
            {gallery.map(image => (
              <li key={image.src}>
                <figure>
                  <div className="gallery-thumb"><ImageLightbox src={image.src} alt={image.alt} caption={image.caption} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" /></div>
                  {image.caption && <figcaption>{image.caption}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div className="gallery-empty">
            <ImageIcon size={28} strokeWidth={1} aria-hidden="true" />
            <p>{planned ? "Screenshots will appear here once the project is built." : "Screenshots and visuals of this project are yet to be added."}</p>
          </div>
        )}
      </DetailSection>

      <nav className="detail-pager" aria-label="More projects">
        {previous ? <Link href={`${base}/projects/${previous.slug}/`} rel="prev"><span><ArrowLeft size={14} aria-hidden="true" /> Previous project</span><strong>{previous.name}</strong></Link> : <span />}
        {next ? <Link href={`${base}/projects/${next.slug}/`} rel="next" className="is-next"><span>Next project <ArrowRight size={14} aria-hidden="true" /></span><strong>{next.name}</strong></Link> : <Link href={`${base}/#projects`} className="is-next"><span>All projects <ArrowRight size={14} aria-hidden="true" /></span><strong>Back to {expertise.label}</strong></Link>}
      </nav>
    </article>
  );
}
