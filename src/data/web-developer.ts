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
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
      ],
    },
    {
      category: "Backend",
      items: [
        "PHP",
        "Laravel",
        "CodeIgniter",
        "Node.js",
        "NestJS",
        "Python",
        "FastAPI",
      ],
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
      slug: "job-application-tracker",
      name: "Job Application Tracker",
      image: "/images/projects/job-tracker/Dashboard.png",
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
      github: "https://github.com/yorandi/job-application-tracker",
      caseStudy: {
        why: "As a job seeker, applying to multiple companies means dealing with a fragmented workflow. Tracking applications across different job boards, direct career sites, and email threads makes it incredibly hard to monitor progress and maintain an organized job search pipeline.",
        solution:
          "A full-stack Next.js application backed by PostgreSQL through Prisma. Each application is stored with its current status, its own notes, and a history of changes, behind authenticated access and input validation.",
        usage: [
          'Add a New Application: Whenever you apply for a job—whether through a job portal, an email, or a company\'s career page—click "Add Application" and input key details such as the Company Name, Job Title, Source, and Application Date.',
          "Track the Status: As you progress through the hiring process, update the application status (e.g., Applied, Assessment, Interview, Rejected, or Offered) to keep your pipeline accurate.",
          "Monitor Your Dashboard: Use the main dashboard to get a bird's-eye view of your job search. You can easily view all your applications in one unified list and see which companies you need to follow up with.",
        ],
        gallery: [
          {
            src: "/images/projects/job-tracker/Dashboard.png",
            alt: "Dashboard",
            caption:
              "The main dashboard shows a bird's-eye view of your job search, with all your applications in one unified list.",
          },
          {
            src: "/images/projects/job-tracker/Application.png",
            alt: "Applications",
            caption:
              "The applications page lists all your job applications, allowing you to filter and sort by status.",
          },
          {
            src: "/images/projects/job-tracker/Detail-Application.png",
            alt: "Detail Application",
            caption:
              "The detail application page shows all the information about a specific job application.",
          },
          {
            src: "/images/projects/job-tracker/analytics.png",
            alt: "Analytics",
            caption:
              "The analytics page shows a visual representation of your job search data.",
          },
          {
            src: "/images/projects/job-tracker/pipeline.png",
            alt: "Pipeline",
            caption:
              "The pipeline page shows the workflow of your job search data.",
          },
        ],
      },
    },
    {
      slug: "palm-vein-payment-prototype",
      name: "Palm-Vein Digital Payment Prototype",
      image: "/images/projects/palm-pay/dashboard.png",
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
      caseStudy: {
        why: "Modern digital payments often force a trade-off between security and convenience. Devices can be lost, and passwords can be stolen. I wanted to build a system where the user's own body acts as the ultimate, secure wallet. By utilizing internal palm vein patterns—which are nearly impossible to replicate or steal—this project ensures a highly secure, contactless, and effortless payment experience without requiring phones or cards.",
        solution:
          "An experimental setup that explores palm-vein recognition as an identity signal in a payment flow. Images are captured with a Raspberry Pi 3 Model B and NoIR camera, recognition is explored with CNN and Siamese Network models, and a Python FastAPI service with PostgreSQL ties the workflow together. Evaluation is limited to the research setup and is not a production security validation.",
        usage: [
          "Registration & Enrollment Before using the system, the user must register their palm vein pattern. The user places their hand above the scanner, and the system captures an infrared image of the vascular structure. It then performs feature extraction to generate a unique, secure biometric template, which is safely stored in the database.",
          "Seamless Transaction To make a payment, the user simply hovers their hand over the scanner again. The system instantly captures the live image, extracts the features in real-time, and matches it against the registered template to authenticate the user and authorize the transaction securely.",
        ],
        gallery: [
          {
            src: "/images/projects/palm-pay/elektronika.png",
            alt: "Elektronika",
            caption: "Electronic design and wiring",
          },
          {
            src: "/images/projects/palm-pay/raspi.jpeg",
            alt: "Raspi + CameraNoIR",
            caption: "The main tool used for the payment system",
          },
          {
            src: "/images/projects/palm-pay/dashboard.png",
            alt: "Palm Pay dashboard",
            caption:
              "The dashboard shows the user's balance, menu, and historical transactions.",
          },
          {
            src: "/images/projects/palm-pay/register.png",
            alt: "Register",
            caption: "Register processing",
          },
          {
            src: "/images/projects/palm-pay/pay.png",
            alt: "Pay",
            caption: "Payment processing",
          },
          {
            src: "/images/projects/palm-pay/history.png",
            alt: "History",
            caption: "Historical transactions",
          },
        ],
      },
    },
    {
      slug: "plantops",
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
      image: "/images/fcc_web.jpg",

      verified: true,
      skills: [
        "HTML",
        "CSS",
        "Responsive Design",
        "Flexbox",
        "CSS Grid",
        "Accessibility",
      ],
      note: "Completed learning. Credential proof, completion date, and certificate image have not been supplied; not a verified credential.",
    },
    {
      title: "GitHub Foundations — DataCamp course",
      issuer: "DataCamp",
      image: "/images/github_foundation.jpg",
      verified: true,
      skills: ["Git", "GitHub"],
      note: "Completed learning through DataCamp, not an official GitHub Foundations certification. Credential proof and completion date have not been supplied.",
    },
  ],
};
