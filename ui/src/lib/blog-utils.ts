import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta, PaginatedBlogPosts } from './blog-types';

const POSTS_PER_PAGE = 6;
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

// Check if a post should be published based on the publish field
function shouldPublishPost(post: BlogPostMeta): boolean {
  // If no publish field is set, the post is a draft and should not be published
  if (!post.publish) {
    return false;
  }

  // If publish date is in the future, don't publish yet
  const publishDate = new Date(post.publish);
  const now = new Date();

  return publishDate <= now;
}

export function getAllPosts(): BlogPostMeta[] {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return [];
    }

    const files = fs.readdirSync(CONTENT_DIR);
    const posts = files
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map((file) => {
        const slug = file.replace(/\.(md|mdx)$/, '');
        const fullPath = path.join(CONTENT_DIR, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString().split('T')[0],
          author: data.author || 'Anonymous',
          excerpt: data.excerpt || '',
          tags: data.tags || [],
          publish: data.publish, // Include the publish field
        } as BlogPostMeta;
      })
      .filter(shouldPublishPost) // Filter out unpublished posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(CONTENT_DIR, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
      if (!fs.existsSync(mdxPath)) {
        return null;
      }
      const fileContents = fs.readFileSync(mdxPath, 'utf8');
      const { data, content } = matter(fileContents);

      const post = {
        slug,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Anonymous',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        publish: data.publish, // Include the publish field
        content,
      } as BlogPost;

      // Check if the post should be published
      if (!shouldPublishPost(post)) {
        return null;
      }

      return post;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const post = {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Anonymous',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      publish: data.publish, // Include the publish field
      content,
    } as BlogPost;

    // Check if the post should be published
    if (!shouldPublishPost(post)) {
      return null;
    }

    return post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export function getPaginatedPosts(
  page: number = 1,
  tag?: string,
  search?: string,
): PaginatedBlogPosts {
  let posts = getAllPosts();

  // Filter by tag
  if (tag) {
    posts = posts.filter((post) =>
      post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()),
    );
  }

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    );
  }

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      postsPerPage: POSTS_PER_PAGE,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit: number = 3,
): BlogPostMeta[] {
  const allPosts = getAllPosts();

  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const commonTags = post.tags.filter((tag) => tags.includes(tag));
      return {
        post,
        relevanceScore: commonTags.length,
      };
    })
    .filter((item) => item.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit)
    .map((item) => item.post);

  return relatedPosts;
}
