"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useIsPresent,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Database,
  Download,
  Github,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { profile, type Expertise } from "@/data/portfolio";
import { webDeveloper } from "@/data/web-developer";
import { dataEngineer } from "@/data/data-engineer";
import { ThemeToggle } from "./ThemeToggle";
import { PortfolioSections } from "./PortfolioSections";
import { CardArt } from "./Decor";

const expertises = [webDeveloper, dataEngineer];
const sectionLinks = [
  ["overview", "Overview"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["certifications", "Certifications"],
  ["contact", "Contact"],
];

function Navbar({
  expertise,
  detail,
}: {
  expertise?: Expertise;
  detail?: Expertise;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("overview");
  const menuRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!expertise) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    sectionLinks.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [expertise]);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        !navRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link href="/" className="brand" aria-label="HERERAND home">
          <span className="brand-mark">R.</span>
          <span className="brand-name">
            HERERAND<small>CODE. CURIOSITY. CRAFT.</small>
          </span>
        </Link>
        {expertise && (
          <nav
            ref={navRef}
            id="expertise-navigation"
            className={`section-nav${open ? " is-open" : ""}`}
            aria-label="Portfolio sections"
          >
            {sectionLinks.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                onClick={() => {
                  setOpen(false);
                  setActive(id);
                }}
              >
                {id === "experience" && expertise.id === "data-engineer"
                  ? "Learning"
                  : label}
              </a>
            ))}
          </nav>
        )}
        <div className="header-actions">
          {expertise ? (
            <Link href="/" className="switch-link">
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Switch Expertise</span>
            </Link>
          ) : detail ? (
            <Link href={`/${detail.id}/#projects`} className="switch-link">
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Back to projects</span>
            </Link>
          ) : (
            <a className="switch-link" href={`mailto:${profile.email}`}>
              Say hello <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          <ThemeToggle />
          {expertise && (
            <button
              ref={menuRef}
              type="button"
              className="menu-toggle"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="expertise-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function Portrait({ hero = false }: { hero?: boolean }) {
  return (
    <div className={hero ? "hero-portrait" : "portrait-wrap"}>
      <Image
        src={profile.photo}
        alt="Portrait of Randi Fauzi"
        fill
        priority
        sizes={
          hero
            ? "(max-width: 640px) 70vw, 280px"
            : "(max-width: 640px) 70vw, 300px"
        }
        style={{ objectFit: "cover", objectPosition: "50% 35%" }}
      />
      {!hero && (
        <>
          <span className="portrait-index">RF / 001</span>
          <div className="portrait-caption">
            <span>{profile.name}</span>
            <ArrowDownRight size={16} aria-hidden="true" />
          </div>
        </>
      )}
    </div>
  );
}

function ExpertiseCard({
  expertise,
  index,
}: {
  expertise: Expertise;
  index: number;
}) {
  const Icon = expertise.id === "web-developer" ? Braces : Database;
  const reduced = useReducedMotion();
  return (
    <motion.article
      layoutId={reduced ? undefined : `expertise-${expertise.id}`}
      className={`expertise-card ${expertise.id}`}
      transition={{
        layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <Link
        href={`/${expertise.id}/`}
        className="expertise-card-link"
        aria-label={`Explore ${expertise.label} portfolio`}
      >
        <CardArt id={expertise.id} />
        <div className="card-top">
          <span className="card-icon">
            <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <span className="card-index">
            0{index + 1} /{" "}
            {index === 0 ? "PRIMARY FOCUS" : "GROWING SPECIALIZATION"}
          </span>
        </div>
        <div className="card-copy">
          <h2>
            {expertise.label}
            <span aria-hidden="true">.</span>
          </h2>
          <p>{expertise.shortDescription}</p>
        </div>
        <div className="tags">
          {expertise.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="card-bottom">
          <span className="card-cta">Explore this side of me</span>
          <span className="card-arrow">
            <ArrowUpRight size={21} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

const HomeScreen = forwardRef<HTMLDivElement>(function HomeScreen(_, ref) {
  const isPresent = useIsPresent();
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      aria-hidden={!isPresent || undefined}
      inert={!isPresent || undefined}
      className="home-stage page-shell"
      exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
      transition={{ duration: reduced ? 0 : 0.24 }}
    >
      <motion.section
        className="home-intro"
        aria-labelledby="home-title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="intro-copy">
          <p className="availability">
            <span aria-hidden="true" /> OPEN TO DEVELOPER OPPORTUNITIES
          </p>
          <p className="eyebrow">ONE CURIOUS MIND. TWO DIRECTIONS.</p>
          <h1 id="home-title" tabIndex={-1}>
            Hi, I’m <em>Randi.</em>
          </h1>
          <p className="intro-description">
            I build software, engineer solutions,
            <br className="desktop-break" /> and explore data.
          </p>
          <p className="intro-meta">
            Informatics Engineering Graduate <span aria-hidden="true">/</span>{" "}
            Software Development <span aria-hidden="true">/</span> Data
            Exploration
          </p>
        </div>
        <Portrait />
      </motion.section>
      <div className="selection-heading">
        <p className="eyebrow">CHOOSE A DIRECTION</p>
        <p>
          Different disciplines. The same thoughtful approach.{" "}
          <ArrowDown size={14} aria-hidden="true" />
        </p>
      </div>
      <div className="expertise-grid">
        {expertises.map((expertise, index) => (
          <ExpertiseCard
            key={expertise.id}
            expertise={expertise}
            index={index}
          />
        ))}
      </div>
      <div className="home-note">
        <span>BASED IN BANTEN, INDONESIA</span>
        <span>
          MADE WITH INTENTION, NOT JUST CODE <span aria-hidden="true">↗</span>
        </span>
      </div>
    </motion.div>
  );
});

function DataDiagram() {
  return (
    <div
      className="data-diagram"
      aria-label="Conceptual data workflow: collect, prepare, explore. Illustration, not a live pipeline."
    >
      <p className="eyebrow">A WAY OF THINKING</p>
      {["01 / Collect", "02 / Prepare", "03 / Explore"].map((label, index) => (
        <div key={label}>
          <div className="pipeline-node">
            <Database size={18} aria-hidden="true" />
            <span>{label}</span>
          </div>
          {index < 2 && (
            <div className="pipeline-connector" aria-hidden="true">
              <ArrowDown size={16} />
            </div>
          )}
        </div>
      ))}
      <p className="diagram-note">
        From raw observations
        <br />
        to better questions.
      </p>
    </div>
  );
}

function ExpertiseHero({ expertise }: { expertise: Expertise }) {
  const reduced = useReducedMotion();
  const isWeb = expertise.id === "web-developer";
  const words = expertise.headline.split(" ");
  const lastWord = words.pop();
  return (
    <motion.section
      layoutId={reduced ? undefined : `expertise-${expertise.id}`}
      className={`expertise-hero ${expertise.id}`}
      id="overview"
      aria-labelledby="expertise-title"
      transition={{
        layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <motion.div
        className="expertise-hero-grid"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.09,
              delayChildren: reduced ? 0 : 0.22,
            },
          },
        }}
      >
        <motion.div
          className="hero-copy"
          variants={{
            hidden: { opacity: 0, y: reduced ? 0 : 20 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.45 }}
        >
          <p className="hero-kicker">
            <span className="card-icon">
              {isWeb ? (
                <Braces size={20} aria-hidden="true" />
              ) : (
                <Database size={20} aria-hidden="true" />
              )}
            </span>
            {expertise.eyebrow}
          </p>
          <h1 className="hero-title" id="expertise-title" tabIndex={-1}>
            {words.join(" ")} <em>{lastWord}</em>
          </h1>
          <p className="hero-description">{expertise.description}</p>
          <p className="hero-profile">
            I’m {profile.shortName}, an Informatics Engineering graduate from
            Universitas Banten Jaya.{" "}
            {isWeb
              ? "I’m interested in the whole journey — from the interface to the systems behind it."
              : "I’m building on my software background to explore how data can be prepared, understood, and put to use."}
          </p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              Explore projects <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            {profile.cv ? (
              <a className="button button-secondary" href={profile.cv} download>
                Download CV <Download size={16} aria-hidden="true" />
              </a>
            ) : (
              <button
                type="button"
                className="button button-unavailable"
                disabled
                title="CV file has not been provided"
              >
                CV coming soon <Download size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={16} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} aria-hidden="true" />
              LinkedIn
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <a href="#contact">
              Let’s talk <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
        <motion.aside
          className="hero-aside"
          variants={{
            hidden: { opacity: 0, y: reduced ? 0 : 14 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.45 }}
        >
          {isWeb ? (
            <>
              <Portrait hero />
              <div className="hero-aside-caption">
                <span>{profile.name}</span>
                <span>BANTEN, INDONESIA</span>
              </div>
            </>
          ) : (
            <DataDiagram />
          )}
        </motion.aside>
      </motion.div>
    </motion.section>
  );
}

const ExpertiseScreen = forwardRef<HTMLDivElement, { expertise: Expertise }>(
  function ExpertiseScreen({ expertise }, ref) {
    const isPresent = useIsPresent();
    const reduced = useReducedMotion();
    return (
      <motion.div
        ref={ref}
        aria-hidden={!isPresent || undefined}
        inert={!isPresent || undefined}
        className="expertise-stage"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.2 }}
      >
        <div className="page-shell">
          <ExpertiseHero expertise={expertise} />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: reduced ? 0 : 0.35,
            duration: reduced ? 0 : 0.4,
          }}
        >
          <PortfolioSections expertise={expertise} />
        </motion.div>
      </motion.div>
    );
  },
);

export function PortfolioApp({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const route = pathname.replace(/\/$/, "");
  const expertise = expertises.find((item) => route === `/${item.id}`);
  const detailMatch = route.match(
    /^\/(web-developer|data-engineer)\/projects\/[^/]+$/,
  );
  const detailExpertise = detailMatch
    ? expertises.find((item) => item.id === detailMatch[1])
    : undefined;
  const knownRoute = route === "" || Boolean(expertise);
  const previousPath = useRef(pathname);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    // Next's own scroll handling can find an exiting screen; explicitly reset the persistent stage.
    // A hash (e.g. "Back to projects" -> #projects) takes precedence over resetting to the top.
    const hashTarget = window.location.hash
      ? document.getElementById(window.location.hash.slice(1))
      : null;
    if (hashTarget) hashTarget.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    if (hashTarget) return;
    const titleId = expertise
      ? "expertise-title"
      : detailExpertise
        ? "project-title"
        : "home-title";
    const timer = window.setTimeout(
      () => {
        document.getElementById(titleId)?.focus({ preventScroll: true });
      },
      reduced ? 0 : expertise || !detailExpertise ? 700 : 0,
    );
    return () => window.clearTimeout(timer);
  }, [pathname, expertise, detailExpertise, reduced]);

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: reduced ? 0 : 0.45 }}
    >
      <LayoutGroup id="expertise-selector">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar
          key={
            expertise?.id ||
            (detailExpertise ? `${detailExpertise.id}-detail` : "home")
          }
          expertise={expertise}
          detail={detailExpertise}
        />
        <main id="main-content" tabIndex={-1}>
          {knownRoute ? (
            <AnimatePresence initial={false} mode="popLayout">
              {expertise ? (
                <ExpertiseScreen key={expertise.id} expertise={expertise} />
              ) : (
                <HomeScreen key="home" />
              )}
            </AnimatePresence>
          ) : (
            children
          )}
          {knownRoute && children}
        </main>
        <footer className="site-footer page-shell">
          <Link className="brand" href="/" aria-label="HERERAND home">
            <span className="brand-mark">R.</span>
            <span className="brand-name">HERERAND</span>
          </Link>
          <p>Thoughtful software. An ongoing journey.</p>
          <span>
            © {new Date().getFullYear()} {profile.shortName} Fauzi
          </span>
          <a
            href={
              expertise
                ? "#overview"
                : detailExpertise
                  ? "#project-title"
                  : "#home-title"
            }
          >
            BACK TO TOP ↑
          </a>
        </footer>
      </LayoutGroup>
    </MotionConfig>
  );
}
