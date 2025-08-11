import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from './ProjectCard';
import { ProjectMeta } from '@/lib/project-types';

const meta: Meta<typeof ProjectCard> = {
  title: 'Projects/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card displaying project meta data, status, tech badges and links.',
      },
    },
  },
};
export default meta;

const baseProject: ProjectMeta = {
  slug: 'insuasti-site',
  title: 'Personal Portfolio & Blog Platform',
  summary:
    'Next.js 15 + React/TypeScript platform with a reusable design system, content pipeline, and performance-focused architecture.',
  tech: ['nextjs', 'react', 'typescript', 'tailwindcss', 'shadcnui', 'radix-ui', 'openai'],
  coverImage: '/projects/insuasti-site/homepage.png',
  screenshots: ['/projects/insuasti-site/homepage.png'],
  repoUrl: 'https://github.com/locke189/insuasti-web',
  demoUrl: 'https://insuasti.com',
  blogSlug: '',
  date: '2025-05-12',
  status: 'stable',
  highlighted: true,
};

export const Stable: StoryObj<typeof ProjectCard> = {
  args: { project: baseProject },
};

export const InProgress: StoryObj<typeof ProjectCard> = {
  args: {
    project: { ...baseProject, status: 'in-progress', title: 'Refactoring UI System', slug: 'refactor-ui' },
  },
};

export const Beta: StoryObj<typeof ProjectCard> = {
  args: {
    project: { ...baseProject, status: 'beta', title: 'Experimental Analytics Dashboard', slug: 'analytics-dashboard' },
  },
};

export const Archived: StoryObj<typeof ProjectCard> = {
  args: {
    project: { ...baseProject, status: 'archived', title: 'Legacy IoT Prototype', slug: 'legacy-iot' },
  },
};
