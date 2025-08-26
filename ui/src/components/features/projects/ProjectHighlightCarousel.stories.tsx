import type { Meta, StoryObj } from '@storybook/react';
import { ProjectHighlightCarousel } from './ProjectHighlightCarousel';
import { ProjectMeta } from '@/lib/project-types';

const meta: Meta<typeof ProjectHighlightCarousel> = {
  title: 'Projects/ProjectHighlightCarousel',
  component: ProjectHighlightCarousel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Carousel showcasing highlighted projects. Uses shadcn/ui carousel primitives. Navigation arrows only appear when more than one project is provided.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

const base: ProjectMeta = {
  slug: 'insuasti-site',
  title: 'Portfolio Platform',
  summary: 'Next.js 15, RSC architecture, content pipeline, design system.',
  tech: ['nextjs', 'react', 'typescript', 'tailwindcss', 'shadcnui'],
  coverImage: '/projects/insuasti-site/homepage.png',
  screenshots: ['/projects/insuasti-site/homepage.png'],
  repoUrl: 'https://github.com/juan-insuasti/insuasti-web',
  demoUrl: 'https://insuasti.com',
  blogSlug: '',
  date: '2025-05-12',
  status: 'stable',
  highlighted: true,
};

export const Single: Story = {
  args: {
    projects: [base],
  },
};

export const Multiple: Story = {
  args: {
    projects: [
      base,
      {
        ...base,
        slug: 'analytics',
        title: 'Analytics Dashboard',
        status: 'beta',
        tech: ['nextjs', 'react', 'openai', 'vercel'],
      },
      {
        ...base,
        slug: 'iot-platform',
        title: 'IoT Device Manager',
        status: 'in-progress',
        tech: ['esp32', 'iot', 'typescript', 'node'],
      },
    ],
  },
};

export const Many: Story = {
  args: {
    projects: Array.from({ length: 6 }).map((_, i) => ({
      ...base,
      slug: `proj-${i}`,
      title: `Experimental Project ${i + 1}`,
      status: i % 2 ? 'in-progress' : 'beta',
      tech: ['nextjs', 'react', i % 2 ? 'openai' : 'vercel', 'typescript'],
    })),
  },
};

export const Empty: Story = {
  args: { projects: [] },
  parameters: {
    docs: {
      description: {
        story: 'Renders nothing when no projects are provided.',
      },
    },
  },
};
