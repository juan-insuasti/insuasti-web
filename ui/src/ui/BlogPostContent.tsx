import { BlogPost } from '@/lib/blog-types';
import { formatDate, calculateReadingTime } from '@/lib/markdown-utils';
import { Typography } from './Typography';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogPostContentProps {
  post: BlogPost;
  htmlContent: string;
}

export  function BlogPostContent({ post, htmlContent }: BlogPostContentProps) {
  const readingTime = calculateReadingTime(post.content);

  return (
    <article className="mx-auto max-w-4xl">
      {/* Header */}
      <header className="mb-8 space-y-4">
        <Typography as="h1" variant="h1" className="leading-tight">
          {post.title}
        </Typography>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div 
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-code:text-sm prose-pre:bg-muted prose-pre:border"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
