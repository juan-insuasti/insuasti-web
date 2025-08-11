export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  tech: string[];
  coverImage: string;
  screenshots: string[];
  repoUrl: string;
  demoUrl?: string;
  blogSlug?: string | null;
  date: string; // ISO date string
  status: ProjectStatus;
  highlighted?: boolean;
}

export type ProjectStatus = 'planned' | 'in-progress' | 'beta' | 'stable' | 'archived';

export interface PaginatedProjects {
  projects: ProjectMeta[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProjects: number;
    projectsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ProjectSearchParams {
  page?: string;
  tech?: string; // comma-separated
  search?: string;
}
