import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { SectionFullPage } from '@containers/SectionFullPage';
import { BlogPostCard } from '@features/blog/BlogPostCard';
import { Button } from '@ui/Button';
import { Typography } from '@ui/Typography';

import { getHighlightedPost, getLatestPost } from '@lib/blog-utils';

export async function BlogShowcase() {
  const latestPost = getLatestPost();
  const highlightedPost = getHighlightedPost();

  // Don't render the section if we have no posts
  if (!latestPost && !highlightedPost) {
    return null;
  }

  return (
    <SectionFullPage>
      <div className="container mx-auto mb-24">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <Typography as="h2" variant="h2" className="mb-4">
            Latest from the Blog
          </Typography>
          <Typography as="p" variant="p" className="mx-auto max-w-2xl text-muted-foreground">
            {`From insights on frontend development to Raspberry Pi tips. Explore my latest articles and tutorials.`}
          </Typography>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 sm:grid-cols-8 md:grid-cols-12 md:gap-12">
          {/* Latest Post Section */}
          {latestPost && (
            <div className="flex flex-col gap-2 sm:col-span-8 md:col-span-6">
              <div className="mb-6 flex items-center justify-between">
                <Typography as="h3" variant="h3" className="text-primary">
                  Latest Post
                </Typography>
              </div>
              <div className="max-w-none grow">
                <BlogPostCard post={latestPost} />
              </div>
            </div>
          )}

          {/* Highlighted Post Section */}
          {highlightedPost && (
            <div className="flex flex-col gap-2 sm:col-span-8 md:col-span-6">
              <div className="mb-6 flex items-center justify-between">
                <Typography as="h3" variant="h3" className="text-primary">
                  Featured Post
                </Typography>
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                  Highlighted
                </div>
              </div>
              <div className="max-w-none grow">
                {/* Featured post badge */}
                <BlogPostCard post={highlightedPost} />
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Button asChild variant="ghost" size="lg">
            <Link href="/blog">
              <span>Explore All Posts</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
      {/* </section> */}
    </SectionFullPage>
  );
}
