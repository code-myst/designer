import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import siteConfig from "@/site.config";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.tagline,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ "--brand": siteConfig.brandColor } as CSSProperties}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}