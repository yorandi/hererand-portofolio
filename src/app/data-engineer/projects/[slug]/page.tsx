import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/ProjectDetail";
import { dataEngineer } from "@/data/data-engineer";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return dataEngineer.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = dataEngineer.projects.find(item => item.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Data Engineer`, description: project.description };
}

export default async function DataEngineerProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = dataEngineer.projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetail expertise={dataEngineer} project={project} />;
}
