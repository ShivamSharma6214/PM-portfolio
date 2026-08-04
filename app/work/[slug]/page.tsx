import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/src/components/case-study/CaseStudy";
import { SiteHeader } from "@/src/components/layout/SiteHeader";
import { SiteFooter } from "@/src/components/sections/SiteFooter";
import { projectBySlug, projects } from "@/src/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return {
    title: project.metaTitle,
    description: project.cardBlurb,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.metaTitle} — Shivam Sharma`,
      description: project.cardBlurb,
      url: `/work/${project.slug}`,
    },
    twitter: {
      title: `${project.metaTitle} — Shivam Sharma`,
      description: project.cardBlurb,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader variant="sub" />
      <main id="main">
        <CaseStudy project={project} />
      </main>
      <SiteFooter />
    </>
  );
}
