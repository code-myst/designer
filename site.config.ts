export type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  description?: string;
};

const siteConfig = {
  name: "Demo Studio",
  tagline: "Design that tells your story",
  brandColor: "#6d28d9",
  contact: { email: "hello@example.com" },
    adminEmail: "your-admin@email.com",
    cloudinary: {
    cloudName: "dbdkxzx7z",
    uploadPreset: "designer-site",
  },
  projects: [
    { id: "1", title: "Brand Identity", category: "Branding" },
    { id: "2", title: "Mobile App UI", category: "UI/UX" },
    { id: "3", title: "Poster Series", category: "Print" },
    { id: "4", title: "Landing Page", category: "Web" },
  ] as Project[],
};



export default siteConfig;