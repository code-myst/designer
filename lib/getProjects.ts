import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import siteConfig, { Project } from "@/site.config";

export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    if (snap.empty) return siteConfig.projects;

    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: String(data.title ?? ""),
        category: String(data.category ?? ""),
        imageUrl: data.imageUrl ? String(data.imageUrl) : undefined,
        description: data.description ? String(data.description) : undefined,
      };
    });
  } catch (error) {
    console.error("Firestore error:", error);
    return siteConfig.projects;
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const snap = await getDoc(doc(db, "projects", id));
    if (snap.exists()) {
      const data = snap.data();
      return {
        id: snap.id,
        title: String(data.title ?? ""),
        category: String(data.category ?? ""),
        imageUrl: data.imageUrl ? String(data.imageUrl) : undefined,
        description: data.description ? String(data.description) : undefined,
      };
    }
  } catch (error) {
    console.error("Firestore error:", error);
  }
  return siteConfig.projects.find((p) => p.id === id) ?? null;
}