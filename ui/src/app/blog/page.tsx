import { NavBar } from '@/ui/navbar/NavBar';
import { Typography } from '@/ui/Typography';
import { BlogPostCard } from '@/ui/BlogPostCard';
import { BlogFilters } from '@/ui/BlogFilters';
import { BlogPagination } from '@/ui/BlogPagination';
import { getPaginatedPosts, getAllTags } from '@/lib/blog-utils';
import { BlogSearchParams } from '@/lib/blog-types';
import { Suspense } from 'react';

interface BlogPageProps {
  searchParams: Promise<BlogSearchParams>;
}

async function BlogPageContent({ searchParams }: BlogPageProps) {
  const awaitedSearchParams = await searchParams;
  const page = parseInt(awaitedSearchParams.page || '1', 10);
  const tag = awaitedSearchParams.tag;
  const search = awaitedSearchParams.search;
  
  const paginatedData = getPaginatedPosts(page, tag, search);
  const allTags = getAllTags();

  if (paginatedData.posts.length === 0 && (tag || search)) {
    return (
      <div className="text-center py-12">
        <Typography as="h3" variant="h3" className="mb-4">
          No posts found
        </Typography>
        <Typography as="p" variant="p" className="text-muted-foreground mb-6">
          {search && tag 
            ? `No posts found matching "${search}" with tag "${tag}"`
            : search 
            ? `No posts found matching "${search}"`
            : `No posts found with tag "${tag}"`
          }
        </Typography>
        <BlogFilters allTags={allTags} currentTag={tag} currentSearch={search} />
      </div>
    );
  }

  if (paginatedData.posts.length === 0) {
    return (
      <div className="text-center py-12">
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
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
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
      <NavBar />
      <div className="min-h-screen pt-20 pb-28">
        <div className="container mx-auto px-4">
          <header className="mb-12 mt-8 text-center">
            <Typography as="h1" variant="h1" className="mb-4">
              Blog
            </Typography>
            <Typography as="p" variant="p" className="text-muted-foreground max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on frontend development, React, TypeScript, and web technologies.
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
