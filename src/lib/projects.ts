// import { Project } from "@/lib/projects"; // Ensure type is imported or defined

// CHANGE THIS URL to your actual username and repo name
const GITHUB_USERNAME = "ooTEMPESToo";
const PROJECT_HUB_REPO = "project-hub";
const BRANCH = "main";

const REMOTE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${PROJECT_HUB_REPO}/${BRANCH}/projects.json`;

export async function getProjects(): Promise<Project[]> {
  try {
    // We add 'next: { revalidate: 60 }' to cache data for 60 seconds
    // This makes it fast but ensures updates appear quickly
    const response = await fetch(REMOTE_URL, { next: { revalidate: 60 } });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const json = await response.json();
    return json.projects || [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}
