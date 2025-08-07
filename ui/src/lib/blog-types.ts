export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  content: string;
  publish?: string; // Optional publish date, if not set or future date, post is hidden
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  publish?: string; // Optional publish date, if not set or future date, post is hidden
}

export interface PaginatedBlogPosts {
  posts: BlogPostMeta[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    postsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface BlogSearchParams {
  page?: string;
  tag?: string;
  search?: string;
}
