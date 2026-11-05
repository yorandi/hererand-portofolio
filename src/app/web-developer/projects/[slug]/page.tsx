import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/ProjectDetail";
import { webDeveloper } from "@/data/web-developer";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return webDeveloper.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = webDeveloper.projects.find(item => item.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Web Developer`, description: project.description };
}

export default async function WebDeveloperProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = webDeveloper.projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetail expertise={webDeveloper} project={project} />;
}
