import Link from 'next/link';

import { Badge } from '@ui/badge';
import { Typography } from '@ui/Typography';

import { BlogPostMeta } from '@lib/blog-types';
import { formatDate } from '@lib/markdown-utils';

interface BlogPostCardProps {
  post: BlogPostMeta;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="h-full p-6">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.author}</span>
            </div>

            <Link href={`/blog/${post.slug}`} className="block group-hover:no-underline">
              <Typography
                as="h3"
                variant="h4"
                className="mb-2 transition-colors group-hover:text-primary"
              >
                {post.title}
              </Typography>
            </Link>

            <Typography
              as="p"
              variant="p"
              className="mb-4 line-clamp-3 text-muted-foreground sm:text-base"
            >
              {post.excerpt}
            </Typography>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="m-0 p-0 text-xs"
                >
                  <Badge
                    variant="secondary"
                    className="transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline">+{post.tags.length - 3} more</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
