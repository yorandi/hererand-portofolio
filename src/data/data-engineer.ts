import type { Expertise } from "./portfolio";

export const dataEngineer: Expertise = {
  id: "data-engineer",
  label: "Data Engineer",
  eyebrow: "Developing specialization · Learning journey",
  headline: "Turning data into meaningful solutions.",
  description:
    "Exploring data engineering, data analysis, database systems, and machine learning. This is a developing specialization and learning journey, not a claim of extensive professional data engineering experience.",
  shortDescription:
    "Learning to prepare, analyze, and model data through practical exploration.",
  tags: ["Python", "SQL", "Pandas", "PostgreSQL"],
  skills: [
    {
      category: "Programming",
      items: ["Python", "SQL"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MySQL"],
    },
    {
      category: "Data Analysis",
      items: ["Pandas", "NumPy", "Data Cleaning", "Exploratory Data Analysis"],
    },
    {
      category: "Visualization",
      items: ["Matplotlib"],
    },
    {
      category: "Concepts",
      items: [
        "Data Modeling",
        "ETL Fundamentals",
        "Statistics",
        "Clustering",
        "Data Processing",
      ],
    },
  ],
  projects: [
    {
      slug: "bank-transaction-clustering",
      name: "Bank Transaction Clustering",
      description:
        "A learning project exploring clustering analysis using a bank transaction dataset. The scope covers data preprocessing and clustering evaluation; no quantified results or production deployment are claimed.",
      stack: ["Python", "Pandas", "Scikit-learn"],
      features: [
        "Data preprocessing for bank transaction analysis",
        "Clustering experimentation and evaluation",
      ],
      status: "Learning project",
      kind: "data",
      caseStudy: {
        // why: "...",
        solution:
          "A Python workflow that prepares a bank transaction dataset with Pandas, then explores clustering with Scikit-learn and evaluates the resulting groups. It is a learning exercise; no quantified results or production use are claimed.",
        // usage: ["Step one", "Step two"],
        // gallery: [{ src: "/images/projects/bank-transaction-clustering/clusters.png", alt: "...", caption: "..." }],
      },
    },
    {
      slug: "palm-vein-dataset-analysis",
      name: "Palm-Vein Dataset Analysis",
      description:
        "Research-focused dataset preparation and analysis for palm-vein recognition, including CNN and Siamese model experimentation. Evaluation and comparison apply to the experimental setup, not production performance or payment security.",
      stack: ["Python", "CNN", "Siamese Network"],
      features: [
        "Dataset preparation and analysis",
        "CNN and Siamese model experimentation",
        "Research model evaluation and comparison without production performance claims",
      ],
      status: "Research prototype",
      kind: "research",
      caseStudy: {
        solution:
          "The data side of the palm-vein research: preparing and analysing the image dataset, then experimenting with CNN and Siamese models and comparing them. Findings apply to the experimental setup only, not production performance or payment security.",
      },
    },
    {
      slug: "data-pipeline-project",
      name: "Data Pipeline Project",
      description:
        "An editable placeholder for a future ETL learning project. Dataset, technology choices, and implementation details remain to be defined; no pipeline has been presented as implemented.",
      stack: [],
      features: [
        "Planned: define a source dataset and target data model",
        "Planned: explore extraction, transformation, and loading",
      ],
      status: "Planned",
      kind: "planned",
    },
  ],
  // Add learning achievements when course details are supplied; verify only with credential proof.
  certificates: [],
};
