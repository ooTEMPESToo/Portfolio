// src/lib/projects.ts

export type Project = {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  iframeUrl?: string;
};

// ------------------------------------------------------------------
// CONFIGURATION: Connects to your "Headless" Data Repository
// ------------------------------------------------------------------
const GITHUB_USERNAME = "ooTEMPESToo";
const PROJECT_HUB_REPO = "project-hub"; // Ensure you created this Repo!
const BRANCH = "main";

// We fetch the "Raw" version of the file directly from GitHub
const REMOTE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${PROJECT_HUB_REPO}/${BRANCH}/projects.json`;

export async function getProjects(): Promise<Project[]> {
  try {
    // 'next: { revalidate: 60 }' tells Next.js to cache this data for 60 seconds.
    // This means if you update GitHub, your site updates in ~1 minute.
    const response = await fetch(REMOTE_URL, { 
      next: { revalidate: 60 } 
    });

    if (!response.ok) {
      // If the repo doesn't exist yet, we return empty to prevent crashing
      console.warn(`Failed to fetch projects from ${REMOTE_URL}. Status: ${response.status}`);
      return [];
    }

    const json = await response.json();
    return json.projects || [];
  } catch (error) {
    console.error('Error fetching projects from Project Hub:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}