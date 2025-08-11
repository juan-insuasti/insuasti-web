import fs from 'fs';
import path from 'path';
import { ProjectMeta, PaginatedProjects } from './project-types';

const PROJECTS_PER_PAGE = 6;
const CONTENT_DIR = path.join(process.cwd(), 'content', 'projects');

function shouldPublishProject(project: ProjectMeta): boolean {
  const projectDate = new Date(project.date);
  const now = new Date();
  return projectDate <= now; // hide future-dated
}

export function getAllProjects(): ProjectMeta[] {
  try {
    if (!fs.existsSync(CONTENT_DIR)) return [];
    const files = fs.readdirSync(CONTENT_DIR);
    const projects = files
      .filter((f) => f.endsWith('.json'))
      .map((file) => {
        const fullPath = path.join(CONTENT_DIR, file);
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const data = JSON.parse(raw) as ProjectMeta;
        return data;
      })
      .filter(shouldPublishProject)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return projects;
  } catch (e) {
    console.error('Error reading projects:', e);
    return [];
  }
}

export function getHighlightedProjects(max: number = 3): ProjectMeta[] {
  return getAllProjects()
    .filter((p) => p.highlighted)
    .slice(0, max);
}

export function getAllTech(): string[] {
  const techSet = new Set<string>();
  getAllProjects().forEach((p) => p.tech.forEach((t) => techSet.add(t)));
  return Array.from(techSet).sort();
}

export function getPaginatedProjects(
  page: number = 1,
  techCsv?: string,
  search?: string,
): PaginatedProjects {
  const highlighted = new Set(getHighlightedProjects().map((p) => p.slug));
  let projects = getAllProjects().filter((p) => !highlighted.has(p.slug));

  if (techCsv) {
    const filterTech = techCsv
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    if (filterTech.length) {
      projects = projects.filter((p) =>
        filterTech.every((ft) => p.tech.some((t) => t.toLowerCase() === ft)),
      );
    }
  }

  if (search) {
    const s = search.toLowerCase();
    projects = projects.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.summary.toLowerCase().includes(s) ||
        p.tech.some((t) => t.toLowerCase().includes(s)),
    );
  }

  const totalProjects = projects.length;
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE) || 1;
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * PROJECTS_PER_PAGE;
  const end = start + PROJECTS_PER_PAGE;
  const slice = projects.slice(start, end);

  return {
    projects: slice,
    pagination: {
      currentPage,
      totalPages,
      totalProjects,
      projectsPerPage: PROJECTS_PER_PAGE,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
}
