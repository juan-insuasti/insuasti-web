import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog-types';
import { formatDate } from '@/lib/markdown-utils';
import { Typography } from './Typography';
import { Badge } from '@/components/ui/badge';

interface BlogPostCardProps {
  post: BlogPostMeta;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md h-full">
      <div className="p-6 h-full">
        <div className="flex flex-col justify-between h-full">

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          
          <Link href={`/blog/${post.slug}`} className="block group-hover:no-underline">
            <Typography as="h3" variant="h4" className="mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </Typography>
          </Link>
          
          <Typography as="p" variant="p" className="text-muted-foreground mb-4 line-clamp-3 sm:text-base">
            {post.excerpt}
          </Typography>
          </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className='p-0 m-0 text-xs'>
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline">
                +{post.tags.length - 2} more
              </Badge>
            )}
          </div>

          </div>
        </div>
      </div>
    </article>
  );
}
