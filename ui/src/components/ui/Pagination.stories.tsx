import type { Meta, StoryObj } from '@storybook/react';

import { PaginatedBlogPosts } from '@/lib/blog-types';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Blog/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/blog',
        query: {},
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    paginatedData: {
      description: 'Paginated blog posts data with pagination info',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const createPaginatedData = (
  currentPage: number,
  totalPages: number,
  totalPosts: number,
  postsPerPage: number = 6,
): PaginatedBlogPosts => ({
  posts: [], // We don't need actual posts for pagination component
  pagination: {
    currentPage,
    totalPages,
    totalPosts,
    postsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  },
});

export const FirstPage: Story = {
  args: {
    paginatedData: createPaginatedData(1, 5, 30),
  },
};

export const MiddlePage: Story = {
  args: {
    paginatedData: createPaginatedData(3, 8, 48),
  },
};

export const LastPage: Story = {
  args: {
    paginatedData: createPaginatedData(5, 5, 30),
  },
};

export const SinglePage: Story = {
  args: {
    paginatedData: createPaginatedData(1, 1, 3),
  },
};

export const TwoPages: Story = {
  args: {
    paginatedData: createPaginatedData(1, 2, 12),
  },
};

export const TwoPagesSecond: Story = {
  args: {
    paginatedData: createPaginatedData(2, 2, 12),
  },
};

export const ManyPages: Story = {
  args: {
    paginatedData: createPaginatedData(15, 25, 150),
  },
};

export const ManyPagesNearEnd: Story = {
  args: {
    paginatedData: createPaginatedData(23, 25, 150),
  },
};

export const LargePagination: Story = {
  args: {
    paginatedData: createPaginatedData(50, 100, 600),
  },
};
