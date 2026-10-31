export const profile = {
  name: "Ahmad Randi Fauzi",
  role: "Software Engineer",
  location: "Indonesia, Banten",
  email: "randifauzi12@gmail.com",
  github: "https://github.com/yorandi",
  linkedin: "https://www.linkedin.com/in/randifuazi",
  availability: "Open to software Engineering/ Web Developer opportunities",
};

export const skills = [
  {
    category: "Frontend",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "PHP",
      "Laravel",
      "CodeIgniter",
      "Python",
      "FastAPI",
    ],
  },
  {
    category: "Data & Tools",
    items: ["PostgreSQL", "MySQL", "Prisma", "Git", "REST API", "Raspberry Pi"],
  },
];

export const projects = [
  {
    number: "01",
    name: "Job Application Tracker",
    type: "Full-stack web application",
    description:
      "A personal job-search workspace for organizing applications, tracking application statuses, and keeping notes about each opportunity.",
    problem:
      "When applications are spread across emails and job boards, it becomes difficult to remember follow-ups and track progress.",
    contribution:
      "Built application-management flows with Next.js, Prisma, PostgreSQL, authentication, validation, and application history. A deployed version has been used for project demonstrations.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js"],
    github: "https://github.com/yorandi",
    demo: "https://job-application-tracks.vercel.app",
    status: "Deployed",
    visual: "tracker",
  },
  {
    number: "02",
    name: "Palm-Vein Payment Prototype",
    type: "Biometric & AI research prototype",
    description:
      "A prototype exploring palm-vein verification as an identity signal in a digital payment workflow, using a Raspberry Pi camera setup and a Python API.",
    problem:
      "The project investigates whether palm-vein patterns can support a contactless identity-verification flow in a constrained prototype environment.",
    contribution:
      "Integrated image acquisition planning, biometric-model experiments, and API/database workflow design. Evaluation results belong to the current experimental setup and should not be interpreted as production-grade security validation.",
    stack: [
      "Python",
      "CNN",
      "Siamese Network",
      "FastAPI",
      "Raspberry Pi",
      "PostgreSQL",
    ],
    github: "https://github.com/yorandi",
    demo: "",
    status: "Research prototype",
    visual: "biometric",
  },
];

export const experience = [
  {
    date: "25 Oktober 2021 - 26 Oktober 2022",
    title: "Technician",
    organization: "CV. Pasir Malaka",
    description:
      " Diagnosed and resolved issues affecting computers, printers, photocopiers, and projectors",
  },
  {
    date: "Education",
    title: "S.Kom. in Informatics Engineering",
    organization: "Universitas Banten Jaya (UNBAJA)",
    description:
      "Focused on software development, web technologies, databases, and an applied AI/biometric payment prototype.",
  },
];
