import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { ProjectCard } from '@features/projects/ProjectCard';
import { ProjectFilters } from '@features/projects/ProjectFilters';
import { NavBar } from '@layout/navbar/NavBar';
import { JsonLd } from '@ui/JsonLd';
import { Pagination } from '@ui/Pagination';
import { Typography } from '@ui/Typography';

import type { PaginatedBlogPosts } from '@lib/blog-types';
import { projectsPageJsonLd } from '@lib/jsonld';
import { ProjectSearchParams } from '@lib/project-types';
import { getAllProjects, getAllTech, getPaginatedProjects } from '@lib/project-utils';

export const metadata: Metadata = {
  title: 'Projects | insuasti.com',
  description: 'A curated selection of web and electronics projects I’ve built.',
  openGraph: {
    title: 'Projects | insuasti.com',
    description: 'A curated selection of web and electronics projects I’ve built.',
    url: 'https://www.insuasti.com/projects',
    images: [
      {
        url: 'https://www.insuasti.com/og.png',
        width: 1200,
        height: 630,
        alt: 'Projects preview',
      },
    ],
    type: 'website',
  },
};

interface ProjectsPageProps {
  searchParams: Promise<ProjectSearchParams>;
}

async function ProjectsPageContent({ searchParams }: ProjectsPageProps) {
  const awaited = await searchParams;
  const page = parseInt(awaited.page || '1', 10);
  const techCsv = awaited.tech;
  const search = awaited.search;

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
      <ProjectFilters allTech={allTech} currentTechCsv={techCsv} currentSearch={search} />
      <div className="flex flex-col gap-6">
        {paginated.projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <div className="mt-10">
        <Pagination paginatedData={paginationForReuse} />
      </div>
    </>
  );
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const allProjects = getAllProjects();

  return (
    <>
      <JsonLd data={projectsPageJsonLd(allProjects)} />
      <NavBar />
      <div className="py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <header className="mb-12 mt-8 text-center">
            <Typography as="h1" variant="h1" className="mb-4">
              Projects
            </Typography>
            <Typography as="p" variant="p" className="mx-auto max-w-2xl text-muted-foreground">
              This is a curated list of side projects that I have been working on on my free time.
              Most of them are open source and available on{' '}
              <Link href="https://github.com/juan-insuasti/" className="text-primary">
                GitHub
              </Link>
              .
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
