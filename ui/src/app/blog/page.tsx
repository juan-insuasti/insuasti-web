import { NavBar } from '@/components/layout/navbar/NavBar';
import { Typography } from '@/components/ui/Typography';
import { BlogPostCard } from '@/components/lockups/blog/BlogPostCard';
import { BlogFilters } from '@/components/lockups/blog/BlogFilters';
import { BlogPagination } from '@/components/lockups/blog/BlogPagination';
import { getPaginatedPosts, getAllTags } from '@/lib/blog-utils';
import { BlogSearchParams } from '@/lib/blog-types';
import { Suspense } from 'react';
import { JsonLd } from '@/components/ui/JsonLd';
import { blogPageJsonLd } from '@/lib/jsonld';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | insuasti.com',
  description: 'Articles on web development, electronics, and creative problem-solving.',
  openGraph: {
    title: 'Blog | insuasti.com',
    description: 'Articles on web development, electronics, and creative problem-solving.',
    url: 'https://insuasti.com/blog',
    images: [
      {
        url: 'https://www.insuasti.com/og.png',
        width: 1200,
        height: 630,
        alt: 'Blog preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    title: 'Blog | insuasti.com',
    description: 'Articles on web development, electronics, and creative problem-solving.',
  },
};
interface BlogPageProps {
  searchParams: Promise<BlogSearchParams>;
}

const BLOG_TITLE = 'Blog';
const BLOG_DESCRIPTION = `A mix of brain dumps, tech notes, and the occasional deep dive into frontend, web technologies, and electronics... all sprinkled with geek references and millennial pop culture. Don't take it too seriously, it's just my digital playground!`;

async function BlogPageContent({ searchParams }: BlogPageProps) {
  const awaitedSearchParams = await searchParams;
  const page = parseInt(awaitedSearchParams.page || '1', 10);
  const tag = awaitedSearchParams.tag;
  const search = awaitedSearchParams.search;

  const paginatedData = getPaginatedPosts(page, tag, search);
  const allTags = getAllTags();

  if (paginatedData.posts.length === 0 && (tag || search)) {
    return (
      <div className="py-12 text-center">
        <Typography as="h3" variant="h3" className="mb-4">
          No posts found
        </Typography>
        <Typography as="p" variant="p" className="mb-6 text-muted-foreground">
          {search && tag
            ? `No posts found matching "${search}" with tag "${tag}"`
            : search
              ? `No posts found matching "${search}"`
              : `No posts found with tag "${tag}"`}
        </Typography>
        <BlogFilters allTags={allTags} currentTag={tag} currentSearch={search} />
      </div>
    );
  }

  if (paginatedData.posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <Typography as="h3" variant="h3" className="mb-4">
          No blog posts yet
        </Typography>
        <Typography as="p" variant="p" className="text-muted-foreground">
          Check back soon for new content!
        </Typography>
      </div>
    );
  }

  return (
    <>
      <BlogFilters allTags={allTags} currentTag={tag} currentSearch={search} />

      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedData.posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      <BlogPagination paginatedData={paginatedData} />
    </>
  );
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <>
      <JsonLd data={blogPageJsonLd()} />
      <NavBar />
      <div className="pb-12 pt-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <header className="mb-12 mt-8 text-center">
            <Typography as="h1" variant="h1" className="mb-4">
              {BLOG_TITLE}
            </Typography>
            <Typography as="p" variant="p" className="mx-auto max-w-2xl text-muted-foreground">
              {BLOG_DESCRIPTION}
            </Typography>
          </header>

          <Suspense fallback={<div>Loading...</div>}>
            <BlogPageContent searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
