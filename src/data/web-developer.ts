import type { Expertise } from "./portfolio";

export const webDeveloper: Expertise = {
  id: "web-developer",
  label: "Web Developer",
  eyebrow: "Primary focus · Software development",
  headline: "Building digital experiences through code.",
  description:
    "Focused on full-stack development, backend engineering, and practical software solutions.",
  shortDescription:
    "Building web applications and exploring practical backend solutions.",
  tags: ["Next.js", "TypeScript", "NestJS", "PostgreSQL"],
  skills: [
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["PHP", "Laravel", "CodeIgniter", "Node.js", "NestJS", "Python", "FastAPI"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MySQL", "Prisma"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Postman"],
    },
  ],
  projects: [
    {
      name: "Job Application Tracker",
      description:
        "A full-stack job-search workspace for organizing applications, tracking application statuses, and keeping notes about each opportunity. A deployed version is available for project demonstrations.",
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js"],
      features: [
        "Application management and status tracking",
        "Notes for each opportunity",
        "Authentication and validation",
        "Application history",
      ],
      status: "Deployed",
      kind: "web",
      demo: "https://job-application-tracks.vercel.app",
    },
    {
      name: "Palm-Vein Digital Payment Prototype",
      description:
        "A research prototype exploring palm-vein recognition as an identity signal in a digital payment workflow. Experiments use a Raspberry Pi camera setup and a Python API; this is not a production-ready payment security system.",
      stack: [
        "Python",
        "CNN",
        "Siamese Network",
        "FastAPI",
        "Raspberry Pi 3 Model B",
        "Raspberry Pi NoIR Camera",
        "PostgreSQL",
      ],
      features: [
        "CNN and Siamese Network experimentation for palm-vein recognition",
        "Image acquisition planning with Raspberry Pi 3 Model B and NoIR Camera",
        "Python and FastAPI integration with PostgreSQL workflow design",
        "Experimental evaluation limited to the research setup, not production security validation",
      ],
      status: "Research prototype",
      kind: "research",
    },
    {
      name: "PlantOps — Industrial Maintenance Management System",
      description:
        "A planned portfolio project for industrial machine management and maintenance work orders. In development; the listed capabilities are intended scope, not completed features.",
      stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL"],
      features: [
        "Planned: industrial machine management",
        "Planned: maintenance work order management",
      ],
      status: "In Development",
      kind: "planned",
    },
  ],
  certificates: [
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      verified: false,
      note: "Completed learning. Credential proof, completion date, and certificate image have not been supplied; not a verified credential.",
    },
    {
      title: "GitHub Foundations — DataCamp course",
      issuer: "DataCamp",
      verified: false,
      note: "Completed learning through DataCamp, not an official GitHub Foundations certification. Credential proof and completion date have not been supplied.",
    },
  ],
};
