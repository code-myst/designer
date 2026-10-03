import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import siteConfig from "@/site.config";
import { getProject } from "@/lib/getProjects";

export const revalidate = 60;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return { title: siteConfig.name };

  return {
    title: `${project.title} | ${siteConfig.name}`,
    description: project.description || `${project.category} project by ${siteConfig.name}`,
    openGraph: {
      title: project.title,
      description: project.description || project.category,
      images: project.imageUrl ? [project.imageUrl] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl p-4">
      <Link href="/" className="text-sm text-gray-600 hover:underline">
        ← Back to all projects
      </Link>

      {project.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.imageUrl}
          alt={project.title}
          className="mt-4 w-full rounded-lg border object-cover"
        />
      ) : (
        <div
          className="mt-4 flex h-72 items-center justify-center rounded-lg text-white"
          style={{ backgroundColor: "var(--brand)" }}
        >
          Image placeholder
        </div>
      )}

      <h1 className="mt-6 text-3xl font-bold">{project.title}</h1>
      <p className="mt-1 text-sm text-gray-500">{project.category}</p>

      {project.description && (
        <p className="mt-6 whitespace-pre-line leading-relaxed text-gray-800">
          {project.description}
        </p>
      )}
    </main>
  );
}