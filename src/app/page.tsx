import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Terminal,
} from "lucide-react";
import { experience, profile, projects, skills } from "@/data/portfolio";
import Image from "next/image";
function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="section-line" />
      <span>{children}</span>
    </div>
  );
}

function ProjectVisual({ visual }: { visual: string }) {
  /*
 ## Project Unfinished ##
  if (visual === "commerce") {
    return (
      <div className="visual-window commerce-visual" aria-label="Abstract commerce dashboard illustration">
        <div className="visual-top"><span /><span /><span /><b>merchant / overview</b></div>
        <div className="visual-layout">
          <div className="visual-sidebar"><i /><i /><i /><i /></div>
          <div className="visual-main">
            <div className="visual-heading"><span /><span /></div>
            <div className="visual-metrics"><i /><i /><i /></div>
            <div className="visual-chart"><span /><span /><span /><span /><span /><span /><span /><span /></div>
          </div>
        </div>
        <span className="visual-stamp">MULTI-TENANT / 01</span>
      </div>
    );
    }*/

  if (visual === "tracker") {
    return (
      <div
        className="visual-window tracker-visual"
        aria-label="Abstract job application tracker illustration"
      >
        <div className="tracker-title">
          <span className="tiny-mark">Y.</span>
          <span>APPLICATIONS</span>
          <span className="tracker-avatar">Y</span>
        </div>
        <div className="tracker-summary">
          <div>
            <small>ACTIVE TRACKS</small>
            <strong>12</strong>
          </div>
          <div>
            <small>INTERVIEWS</small>
            <strong>03</strong>
          </div>
          <div>
            <small>OFFERS</small>
            <strong>01</strong>
          </div>
        </div>
        <div className="tracker-row">
          <span className="tracker-logo">N</span>
          <span>
            <b>Northstar Labs</b>
            <small>Software Engineer</small>
          </span>
          <em>Interview</em>
        </div>
        <div className="tracker-row">
          <span className="tracker-logo violet">A</span>
          <span>
            <b>Atlas Systems</b>
            <small>Backend Developer</small>
          </span>
          <em className="muted-tag">Applied</em>
        </div>
        <div className="tracker-row">
          <span className="tracker-logo orange">M</span>
          <span>
            <b>Monolith Studio</b>
            <small>Full-stack Developer</small>
          </span>
          <em className="muted-tag">Review</em>
        </div>
        <span className="visual-stamp">PERSONAL WORKFLOW / 02</span>
      </div>
    );
  }

  return (
    <div
      className="visual-window biometric-visual"
      aria-label="Abstract palm-vein biometric research illustration"
    >
      <div className="bio-top">
        <span>BIOMETRIC LAB</span>
        <span>EXPERIMENT 03</span>
      </div>
      <div className="bio-center">
        <div className="palm-art">
          <svg
            viewBox="0 0 180 190"
            role="img"
            aria-label="Stylized palm and vein lines"
          >
            <path d="M61 157 C49 143 37 125 33 106 C30 93 37 86 45 91 L59 108 L50 55 C49 45 61 42 66 53 L79 91 L75 29 C74 17 88 16 91 29 L99 87 L105 39 C107 28 120 31 121 42 L121 91 L131 63 C136 53 147 60 145 72 L139 119 C136 143 124 164 104 174 C88 181 72 173 61 157 Z" />
            <path
              className="vein"
              d="M88 155 L91 117 L77 99 M91 117 L110 100 M91 117 L73 75 M110 100 L118 81 M77 99 L61 92 M91 117 L102 145 M102 145 L118 153 M73 75 L67 60"
            />
          </svg>
        </div>
        <div className="bio-readout">
          <span>PAIR SIMILARITY</span>
          <strong>
            0.98<span>+</span>
          </strong>
          <i>
            <b />
          </i>
          <small>MODEL OUTPUT / VISUAL ONLY</small>
        </div>
      </div>
      <div className="bio-bottom">
        <span>SIAMESE NETWORK</span>
        <span>PALM-VEIN / IR</span>
        <span>RASPBERRY PI</span>
      </div>
      <span className="visual-stamp">RESEARCH PROTOTYPE / 03</span>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Yorandi home">
          <span>R.</span>
          <small>SOFTWARE ENGINEER</small>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">
            Work <span>01</span>
          </a>
          <a href="#about">
            About <span>02</span>
          </a>
          <a href="#stack">
            Stack <span>03</span>
          </a>
          <a href="#contact">
            Contact <span>04</span>
          </a>
        </nav>
        <a className="header-cta" href="#contact">
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
      </header>

      <section className="hero page-shell" id="home">
        <div className="hero-copy">
          <div className="availability">
            <span className="pulse-dot" /> {profile.availability}
          </div>
          <p className="eyebrow">
            INDEPENDENTLY BUILT · THOUGHTFULLY ENGINEERED
          </p>
          <h1>
            Turning complex
            <br />
            problems into <span className="accent-word">useful</span>
            <br />
            software<span className="accent-period">.</span>
          </h1>
          <p className="hero-description">
            I&apos;m {profile.name}, a software engineer focused on building
            thoughtful web applications, dependable backend systems, and
            products that solve real problems.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#work">
              Explore my work <ArrowDownRight size={17} />
            </a>
            <a
              className="button-quiet"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} /> GitHub <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="hero-footnote">
            <span>BASED IN {profile.location.toUpperCase()}</span>
            <span>
              OPEN TO BUILDING WHAT&apos;S NEXT <ArrowDownRight size={13} />
            </span>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo">
            <Image
              src="/images/profile.jpeg"
              alt="Yorandi - Software Engineer"
              fill
              priority
              sizes="(max-width: 768px) 80vw, 400px"
              className="hero-photo-image"
            />
          </div>

          <div className="hero-photo-caption">
            <span>YORANDI / 001</span>
            <span>SOFTWARE ENGINEER</span>
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="Areas of focus">
        <div className="ticker-track">
          <span>FULL-STACK DEVELOPMENT</span>
          <i>✳</i>
          <span>BACKEND SYSTEMS</span>
          <i>✳</i>
          <span>PRODUCT THINKING</span>
          <i>✳</i>
          <span>APPLIED AI</span>
          <i>✳</i>
          <span>FULL-STACK DEVELOPMENT</span>
          <i>✳</i>
          <span>BACKEND SYSTEMS</span>
          <i>✳</i>
        </div>
      </div>

      <section className="work-section page-shell section-pad" id="work">
        <SectionLabel number="01">SELECTED WORK</SectionLabel>
        <div className="section-heading-row">
          <h2>
            Projects built to
            <br />
            <span>do more than look good.</span>
          </h2>
          <p>
            A selection of practical builds and technical exploration — each
            with a problem to solve, decisions to make, and lessons to carry
            forward.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-meta">
                <span>{project.number} / 03</span>
                <span className="status">
                  <i />
                  {project.status}
                </span>
              </div>
              <ProjectVisual visual={project.visual} />
              <div className="project-info">
                <p className="project-type">{project.type}</p>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <details className="project-details">
                  <summary>
                    Read the engineering notes <ArrowDownRight size={15} />
                  </summary>
                  <div className="details-content">
                    <b>The problem</b>
                    <p>{project.problem}</p>
                    <b>My approach</b>
                    <p>{project.contribution}</p>
                  </div>
                </details>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    Source code <ArrowUpRight size={14} />
                  </a>
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      Live demo <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <span className="no-demo">Demo not available</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section section-pad" id="about">
        <div className="page-shell">
          <SectionLabel number="02">A LITTLE ABOUT ME</SectionLabel>
          <div className="about-grid">
            <div>
              <p className="eyebrow">
                CURIOUS BY DEFAULT. PRACTICAL BY DESIGN.
              </p>
              <h2>
                Engineering is
                <br />
                how I <span className="accent-word">think.</span>
              </h2>
            </div>
            <div className="about-body">
              <p>
                I&apos;m an Informatics Engineering graduate from Universitas
                Banten Jaya who enjoys understanding how products work from the
                interface all the way down to data models and APIs.
              </p>
              <p>
                My projects range from multi-tenant commerce and job-search
                tooling to a biometric payment research prototype. I like
                breaking big problems into clear steps, building in small
                iterations, and learning from what the implementation reveals.
              </p>
              <div className="principles">
                <div>
                  <span>01</span>
                  <b>Make it understandable</b>
                  <p>
                    Readable code and clear decisions make software easier to
                    maintain.
                  </p>
                </div>
                <div>
                  <span>02</span>
                  <b>Build for real workflows</b>
                  <p>
                    Useful software starts with the problem, not the framework.
                  </p>
                </div>
                <div>
                  <span>03</span>
                  <b>Keep improving</b>
                  <p>Test, measure, learn, and iterate instead of guessing.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="experience-block">
            <h3>Experience & education</h3>
            {experience.map((item) => (
              <div className="experience-row" key={item.title}>
                <span className="experience-date">{item.date}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p className="experience-org">{item.organization}</p>
                  <p className="experience-description">{item.description}</p>
                </div>
                <ArrowUpRight size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stack-section page-shell section-pad" id="stack">
        <SectionLabel number="03">TOOLS I WORK WITH</SectionLabel>
        <div className="section-heading-row">
          <h2>
            The stack is a tool.
            <br />
            <span>The outcome is the point.</span>
          </h2>
          <p>
            Technologies I&apos;ve used across projects and learning. The goal
            is to choose the right tool for the problem and understand the
            trade-offs.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map((group, index) => (
            <div className="skill-group" key={group.category}>
              <div className="skill-heading">
                <span>0{index + 1}</span>
                <h3>{group.category}</h3>
                <Code2 size={17} />
              </div>
              <div className="skill-tags">
                {group.items.map((skill) => (
                  <span key={skill}>
                    <Check size={13} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="page-shell contact-inner">
          <SectionLabel number="04">HAVE A PROJECT IN MIND?</SectionLabel>
          <p className="eyebrow">LET&apos;S MAKE SOMETHING USEFUL</p>
          <h2>
            Good work starts
            <br />
            with a <span className="accent-word">conversation.</span>
          </h2>
          <p className="contact-description">
            I&apos;m open to software engineering opportunities, collaborative
            projects, and conversations about building better products.
          </p>
          <a
            className="button-primary contact-button"
            href={`mailto:${profile.email}`}
          >
            Get in touch <Mail size={16} />
            <ArrowUpRight size={14} />
          </a>
          <div className="contact-bottom">
            <span>{profile.email}</span>
            <div>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github size={16} /> GitHub <ArrowUpRight size={12} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer page-shell">
        <a className="wordmark" href="#home">
          <span>R.</span>
          <small>SOFTWARE ENGINEER</small>
        </a>
        <p>Designed with intention. Built with code.</p>
        <a href="#home">BACK TO TOP ↑</a>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
      </footer>
    </main>
  );
}
