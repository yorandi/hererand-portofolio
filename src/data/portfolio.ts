export type ExpertiseId = "web-developer" | "data-engineer";

export interface GalleryImage {
  /** Path under /public, e.g. "/images/projects/<slug>/dashboard.png". */
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Content for a project's detail page. Every field is optional; a missing
 * field renders a visible "to be added" placeholder instead of invented text.
 */
export interface CaseStudy {
  /** Why the project was built: the problem or motivation. */
  why?: string;
  /** The approach taken, in prose. Capabilities are listed from `features`. */
  solution?: string;
  /** Step-by-step usage instructions. */
  usage?: string[];
  gallery?: GalleryImage[];
}

export interface Project {
  /** URL segment for the detail page: /<expertise>/projects/<slug>/ */
  slug: string;
  name: string;
  description: string;
  stack: string[];
  features: string[];
  status: string;
  kind: "web" | "research" | "data" | "planned";
  github?: string;
  demo?: string;
  image?: string;
  caseStudy?: CaseStudy;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date?: string;
  credential?: string;
  image?: string;
  verified: boolean;
  note?: string;
  /** Skills gained from this certification or course. */
  skills?: string[];
}

export interface Expertise {
  id: ExpertiseId;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  shortDescription: string;
  tags: string[];
  skills: SkillCategory[];
  projects: Project[];
  certificates: Certificate[];
}

export const profile: {
  name: string;
  shortName: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  availability: string;
  photo: string;
  cv?: string;
} = {
  name: "Ahmad Randi Fauzi",
  shortName: "Randi",
  location: "Indonesia, Banten",
  email: "randifauzi12@gmail.com",
  github: "https://github.com/yorandi",
  linkedin: "https://www.linkedin.com/in/randifauzi",
  availability: "Open to software Engineering/ Web Developer opportunities",
  photo: "/images/profile.jpeg",
};

export const experience: {
  date: string;
  title: string;
  organization: string;
  description: string;
}[] = [
  {
    date: "25 Oktober 2021 - 26 Oktober 2022",
    title: "Technician",
    organization: "CV. Pasir Malaka",
    description:
      "Diagnosed and resolved issues affecting computers, printers, photocopiers, and projectors",
  },
  {
    date: "Education",
    title: "S.Kom. in Informatics Engineering",
    organization: "Universitas Banten Jaya (UNBAJA)",
    description:
      "Focused on software development, web technologies, databases, and an applied AI/biometric payment prototype.",
  },
];
