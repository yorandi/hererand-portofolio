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
      items: ["Data Modeling", "ETL Fundamentals", "Statistics", "Clustering", "Data Processing"],
    },
  ],
  projects: [
    {
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
    },
    {
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
    },
    {
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
