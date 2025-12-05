import fs from 'fs/promises';
import path from 'path';

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

export async function getProjects(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(data);
    return json.projects || [];
  } catch (error) {
    console.error('Failed to read or parse projects.json:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(p => p.slug === slug) || null;
}
