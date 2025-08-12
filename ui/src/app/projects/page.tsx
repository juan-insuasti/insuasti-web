import { NavBar } from '@/ui/navbar/NavBar';
import { Typography } from '@/ui/Typography';
import { Suspense } from 'react';
import { ProjectSearchParams } from '@/lib/project-types';
import { getPaginatedProjects, getAllTech, getHighlightedProjects } from '@/lib/project-utils';
import { ProjectCard } from '@/ui/ProjectCard';
import { ProjectFilters } from '@/ui/ProjectFilters';
import { ProjectHighlightCarousel } from '@/ui/ProjectHighlightCarousel';
import { BlogPagination } from '@/ui/BlogPagination';
import type { PaginatedBlogPosts } from '@/lib/blog-types';
import Link from 'next/link';

interface ProjectsPageProps {
  searchParams: Promise<ProjectSearchParams>;
}

async function ProjectsPageContent({ searchParams }: ProjectsPageProps) {
  const awaited = await searchParams;
  const page = parseInt(awaited.page || '1', 10);
  const techCsv = awaited.tech;
  const search = awaited.search;

  const highlighted = getHighlightedProjects(3);
  const paginated = getPaginatedProjects(page, techCsv, search);
  const allTech = getAllTech();

  const paginationForReuse: PaginatedBlogPosts = {
    posts: paginated.projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      author: '',
      excerpt: p.summary,
      tags: p.tech,
    })),
    pagination: {
      currentPage: paginated.pagination.currentPage,
      totalPages: paginated.pagination.totalPages,
      totalPosts: paginated.pagination.totalProjects,
      postsPerPage: paginated.pagination.projectsPerPage,
      hasNextPage: paginated.pagination.hasNextPage,
      hasPrevPage: paginated.pagination.hasPrevPage,
    },
  };

  return (
    <>
      <ProjectHighlightCarousel projects={highlighted} />
      <ProjectFilters allTech={allTech} currentTechCsv={techCsv} currentSearch={search} />
      <div className="flex flex-col gap-6">
        {paginated.projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <div className="mt-10">
        <BlogPagination paginatedData={paginationForReuse} />
      </div>
    </>
  );
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  return (
    <>
      <NavBar />
      <div className="min-h-screen pb-28 pt-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <header className="mb-12 mt-8 text-center">
            <Typography as="h1" variant="h1" className="mb-4">
              Projects
            </Typography>
            <Typography as="p" variant="p" className="mx-auto max-w-2xl text-muted-foreground">
              This is a curated list of side projects that I have been working on on my free time. Most of them are open source and available on <Link href="https://github.com/locke189/" className="text-primary">GitHub</Link>.
            </Typography>
          </header>
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectsPageContent searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
