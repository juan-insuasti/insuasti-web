import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import { BlogPostCard } from '@features/blog/BlogPostCard';
import { BlogPostContent } from '@features/blog/BlogPostContent';
import { NavBar } from '@layout/navbar/NavBar';

import { getAllPosts, getPostBySlug, getRelatedPosts, getSocialLinks } from '@lib/blog-utils';
import { blogPostJsonLd } from '@lib/jsonld';
import { renderMarkdown } from '@lib/markdown-utils';

import { JsonLd } from '@/components/custom/JsonLd';
import { SocialLinks } from '@/components/custom/SocialLinks';
import { Typography } from '@/components/custom/Typography';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Blog | insuasti.com`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Blog | insuasti.com`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      url: `https://insuasti.com/blog/${slug}`,
      images: [
        {
          url: 'https://insuasti.com/og.png?v=2',
          width: 1200,
          height: 630,
          alt: `${post.title} | preview`,
        },
      ],
    },
    twitter: {
      title: `${post.title} | Blog | insuasti.com`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags);
  const htmlContent = await renderMarkdown(post.content);

  return (
    <>
      <JsonLd data={blogPostJsonLd(post)} />
      <NavBar />
      <div className="min-h-screen pb-28 pt-20">
        <div className="container mx-auto px-4">
          {/* Back to blog link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>

          {/* Blog post content */}
          <BlogPostContent post={post} htmlContent={htmlContent} />

          {/* Share */}
          <section className="mt-16 border-t border-border pt-16  mx-auto max-w-4xl">
            <Typography as="h2" variant="h2" className="mb-8">
              share
            </Typography>
            <SocialLinks socialLinks={getSocialLinks(post)} />
          </section>
          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 border-t border-border pt-16  mx-auto max-w-4xl">
              <Typography as="h2" variant="h2" className="mb-8">
                Related Posts
              </Typography>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogPostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
