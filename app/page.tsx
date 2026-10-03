import Link from "next/link";
import siteConfig from "@/site.config";
import { getProjects } from "@/lib/getProjects";

type Props = { searchParams: Promise<{ category?: string }> };

export default async function Home({ searchParams }: Props) {
  const { category } = await searchParams;
  const projects = await getProjects();

  const categories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean))
  );

  const active = category && categories.includes(category) ? category : "";
  const visible = active
    ? projects.filter((p) => p.category === active)
    : projects;

  const pillBase = "rounded-full border px-4 py-1 text-sm transition";

  return (
    <main className="mx-auto max-w-5xl p-4">
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold">{siteConfig.name}</h1>
        <p className="mt-2 text-gray-600">{siteConfig.tagline}</p>
      </section>

      {categories.length > 0 && (
        <nav className="mb-6 flex flex-wrap justify-center gap-2">
          <Link
            href="/"
            className={pillBase}
            style={
              !active
                ? { backgroundColor: "var(--brand)", color: "white", borderColor: "var(--brand)" }
                : undefined
            }
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/?category=${encodeURIComponent(c)}`}
              className={pillBase}
              style={
                active === c
                  ? { backgroundColor: "var(--brand)", color: "white", borderColor: "var(--brand)" }
                  : undefined
              }
            >
              {c}
            </Link>
          ))}
        </nav>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        {visible.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="block overflow-hidden rounded-lg border transition hover:shadow-md"
          >
            {p.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.imageUrl}
                alt={p.title}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div
                className="flex h-48 items-center justify-center text-white"
                style={{ backgroundColor: "var(--brand)" }}
              >
                Image placeholder
              </div>
            )}
            <div className="p-3">
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-500">{p.category}</p>
            </div>
          </Link>
        ))}
      </section>

      {visible.length === 0 && (
        <p className="py-10 text-center text-gray-500">No projects found.</p>
      )}
    </main>
  );
}