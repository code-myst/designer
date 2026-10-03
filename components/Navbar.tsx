import Link from "next/link";
import siteConfig from "@/site.config";

export default function Navbar() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link
          href="/"
          className="text-xl font-bold"
          style={{ color: "var(--brand)" }}
        >
          {siteConfig.name}
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <a href={`mailto:${siteConfig.contact.email}`}>Contact</a>
        </div>
      </nav>
    </header>
  );
}