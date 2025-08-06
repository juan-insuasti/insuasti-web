import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { NavBar } from '@/ui/navbar/NavBar';
import { BlogPostContent } from '@/ui/BlogPostContent';
import { BlogPostCard } from '@/ui/BlogPostCard';
import { Typography } from '@/ui/Typography';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog-utils';
import { renderMarkdown } from '@/lib/markdown-utils';

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
    title: `${post.title} | Blog | Insuasti.com`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
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
      <NavBar />
      <div className="min-h-screen pt-20 pb-28">
        <div className="container mx-auto px-4">
          {/* Back to blog link */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>

          {/* Blog post content */}
          <BlogPostContent post={post} htmlContent={htmlContent} />

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-16 border-t border-border">
              <Typography as="h2" variant="h2" className="mb-8 text-center">
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
