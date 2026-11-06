import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Braces,
  Database,
  Github,
  LayoutTemplate,
  Lightbulb,
  LineChart,
  Linkedin,
  Mail,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  experience,
  profile,
  type Certificate,
  type Expertise,
  type ExpertiseId,
  type Project,
  type SkillCategory,
} from "@/data/portfolio";
import type { ActivityData } from "@/lib/activity";
import { ActivityContent } from "./ActivityContent";
import { CertificateArt, ProjectArt } from "./Decor";
import { ImageLightbox } from "./ImageLightbox";

const categoryIcons: Record<string, LucideIcon> = {
  Frontend: LayoutTemplate,
  Backend: Server,
  Database: Database,
  Tools: Wrench,
  Programming: Braces,
  "Data Analysis": BarChart3,
  Visualization: LineChart,
  Concepts: Lightbulb,
};

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-index">{number} / EXPLORATION & PRACTICE</p>
        <h2 className="section-title">{title}</h2>
      </div>
      <p className="section-description">{description}</p>
    </div>
  );
}

export function SkillGroup({
  group,
  index,
}: {
  group: SkillCategory;
  index: number;
}) {
  const Icon = categoryIcons[group.category] ?? Braces;
  return (
    <article className="skill-group">
      <div className="skill-heading">
        <span>0{index + 1}</span>
        <h3>{group.category}</h3>
        <Icon size={18} aria-hidden="true" />
      </div>
      <div className="skill-tags">
        {group.items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

export function ProjectVisual({
  project,
  caption,
  sizes,
}: {
  project: Project;
  caption: string;
  sizes: string;
}) {
  if (project.image)
    return (
      <Image
        src={project.image}
        alt={`${project.name} screenshot`}
        fill
        sizes={sizes}
        style={{ objectFit: "contain" }}
      />
    );
  return (
    <>
      <ProjectArt kind={project.kind} />
      <span className="visual-caption">{caption}</span>
    </>
  );
}

export function ProjectCard({
  project,
  index,
  expertiseId,
}: {
  project: Project;
  index: number;
  expertiseId: ExpertiseId;
}) {
  const href = `/${expertiseId}/projects/${project.slug}/`;
  return (
    <article className="project-card">
      <Link
        href={href}
        className="project-visual"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectVisual
          project={project}
          caption={`${String(index + 1).padStart(2, "0")} / SCREENSHOT TO BE ADDED`}
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
      </Link>
      <div className="project-content">
        <span className="project-status">{project.status}</span>
        <h3>
          <Link href={href} className="project-title-link">
            {project.name}
          </Link>
        </h3>
        <p className="project-description">{project.description}</p>
        <div className="tags">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <details className="project-details">
          <summary>
            Scope & engineering notes{" "}
            <ArrowDownRight size={14} aria-hidden="true" />
          </summary>
          <ul className="project-features">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </details>
        <div className="project-links">
          <Link
            className="case-link"
            href={href}
            aria-label={`Read case study: ${project.name}`}
          >
            Case study <ArrowRight size={14} aria-hidden="true" />
          </Link>
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer">
              Source code <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : (
            <span className="missing-link">Repository to be added</span>
          )}
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Live demo <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : (
            <span className="missing-link">No public demo</span>
          )}
        </div>
      </div>
    </article>
  );
}

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const verified = certificate.verified && Boolean(certificate.credential);
  return (
    <article className="certificate-card">
      <div className="certificate-image">
        {certificate.image ? (
          <ImageLightbox
            src={certificate.image}
            alt={`${certificate.title} certificate`}
            caption={`${certificate.title} · ${certificate.issuer}`}
            sizes="(max-width: 640px) 100vw, 50vw"
            fit="contain"
          />
        ) : (
          <>
            <CertificateArt />
            <span className="certificate-caption">
              Certificate image to be added
            </span>
          </>
        )}
      </div>
      <div className="certificate-body">
        <p className="certificate-meta">
          <span
            className={`certificate-badge${verified ? " is-verified" : ""}`}
          >
            {verified ? "Verified credential" : "Completed · evidence pending"}
          </span>
          <span>
            {certificate.issuer} ·{" "}
            {certificate.date || "Completion date to be added"}
          </span>
        </p>
        <h3>{certificate.title}</h3>
        {certificate.note && !verified && (
          <p className="certificate-note">{certificate.note}</p>
        )}
        <div className="certificate-skills">
          <p className="eyebrow">SKILLS GAINED</p>
          {certificate.skills?.length ? (
            <div className="tags">
              {certificate.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          ) : (
            <span className="missing-link">Skills to be added</span>
          )}
        </div>
        {certificate.credential && (
          <a
            className="certificate-link"
            href={certificate.credential}
            target="_blank"
            rel="noreferrer"
          >
            View credential <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export function PortfolioSections({
  expertise,
  activity,
}: {
  expertise: Expertise;
  activity: ActivityData;
}) {
  const isWeb = expertise.id === "web-developer";
  return (
    <>
      <section
        className="content-section page-shell"
        id="skills"
        aria-labelledby="skills-title"
      >
        <SectionHeading
          number="01"
          title="A practical toolkit."
          description={
            isWeb
              ? "Technologies across my projects and learning. No proficiency scores — just tools, context, and continued practice."
              : "The tools and concepts I’m exploring as I develop my data engineering specialization."
          }
        />
        <h3 className="sr-only" id="skills-title">
          {expertise.label} skills
        </h3>
        <div className="skills-grid">
          {expertise.skills.map((group, index) => (
            <SkillGroup key={group.category} group={group} index={index} />
          ))}
        </div>
      </section>
      <section
        className="content-section page-shell"
        id="projects"
        aria-labelledby="projects-title"
      >
        <SectionHeading
          number="02"
          title={isWeb ? "Built with a purpose." : "Following the data."}
          description="Practical builds, research experiments, and what comes next. Each project is labelled to reflect its current scope."
        />
        <h3 className="sr-only" id="projects-title">
          {expertise.label} projects
        </h3>
        <div className="project-grid">
          {expertise.projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              expertiseId={expertise.id}
            />
          ))}
        </div>
      </section>
      <section
        className="content-section page-shell"
        id="experience"
        aria-labelledby="experience-title"
      >
        <SectionHeading
          number="03"
          title={
            isWeb ? "A foundation to build on." : "Learning, then applying."
          }
          description={
            isWeb
              ? "An Informatics Engineering education and hands-on technical support experience shape how I approach problems."
              : "A developing specialization grounded in database systems, analysis, and research. Not a claim of professional data engineering experience."
          }
        />
        <h3 className="sr-only" id="experience-title">
          {isWeb ? "Experience and education" : "Learning journey"}
        </h3>
        {isWeb ? (
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-item" key={item.title}>
                <p className="experience-date">{item.date}</p>
                <div>
                  <h3>
                    {item.title === "Technician"
                      ? "IT Support Technician"
                      : item.title}
                  </h3>
                  <p className="experience-org">{item.organization}</p>
                  <p className="experience-description">{item.description}</p>
                </div>
                <ArrowUpRight size={18} aria-hidden="true" />
              </article>
            ))}
          </div>
        ) : (
          <div className="experience-list">
            {[
              [
                "Foundation",
                "Informatics Engineering",
                "Universitas Banten Jaya (UNBAJA). An academic foundation for exploring software, databases, and applied research.",
              ],
              [
                "Exploration",
                "Preparation → analysis → evaluation",
                "Exploring data cleaning and clustering through bank transactions, alongside palm-vein dataset preparation and model experimentation.",
              ],
              [
                "Next direction",
                "From datasets to pipelines",
                "A future ETL project is planned. Dataset, implementation, and learning milestones will be documented as the work progresses.",
              ],
            ].map(([date, title, description]) => (
              <article className="experience-item" key={title}>
                <p className="experience-date">{date}</p>
                <div>
                  <h3>{title}</h3>
                  <p className="experience-description">{description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <section
        className="content-section page-shell"
        id="activity"
        aria-labelledby="activity-title"
      >
        <SectionHeading
          number="04"
          title={isWeb ? "Practice, in the open." : "Learning in public."}
          description="A look at what I’m actively doing: public code on GitHub and progress on the platforms I learn from. Live figures are fetched when the site is built."
        />
        <h3 className="sr-only" id="activity-title">
          Coding and learning activity
        </h3>
        <ActivityContent expertiseId={expertise.id} activity={activity} />
      </section>
      <section
        className="content-section page-shell"
        id="certifications"
        aria-labelledby="certifications-title"
      >
        <SectionHeading
          number="05"
          title="Always a work in progress."
          description="Learning is ongoing. Each card lists the skills gained; verified credentials are labelled separately from completed courses."
        />
        <h3 className="sr-only" id="certifications-title">
          Certifications and learning
        </h3>
        {expertise.certificates.length ? (
          <div className="certificate-grid">
            {expertise.certificates.map((certificate) => (
              <CertificateCard
                key={certificate.title}
                certificate={certificate}
              />
            ))}
          </div>
        ) : (
          <p className="empty-note">
            No verified credentials published yet. Credential links, completion
            dates, and certificate images will be added when available.
          </p>
        )}
        {!isWeb && (
          <p className="credential-pending">
            DataCamp and other data-related course records can be added here
            once course titles and completion evidence are provided.
          </p>
        )}
      </section>
      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="page-shell">
          <p className="section-index">06 / START A CONVERSATION</p>
          <div className="contact-grid">
            <div>
              <h2 className="contact-title" id="contact-title">
                Good things start
                <br />
                with a <em>hello.</em>
              </h2>
              <p className="contact-description">
                Open to junior web development, full-stack development, and
                software engineering internship opportunities. Let’s talk about
                what we could build.
              </p>
            </div>
            <div className="contact-links">
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight size={22} aria-hidden="true" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github size={17} aria-hidden="true" /> GitHub{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={17} aria-hidden="true" /> LinkedIn{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href={`mailto:${profile.email}`}>
                <Mail size={17} aria-hidden="true" /> Let’s get in touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
