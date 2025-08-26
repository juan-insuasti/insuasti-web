import type { Meta, StoryObj } from '@storybook/react';
import { siGithub, siReact, siTailwindcss, siTypescript } from 'simple-icons';

import { SimpIcon } from './SimpIcon';

const meta: Meta<typeof SimpIcon> = {
  title: 'Components/Icon',
  component: SimpIcon,
  parameters: {
    docs: {
      description: {
        component:
          'A flexible SVG icon component that renders Simple Icons with customizable props.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Simple Icon object containing SVG data',
      control: { type: 'select' },
      options: ['GitHub', 'React', 'TypeScript', 'Tailwind'],
      mapping: {
        GitHub: siGithub,
        React: siReact,
        TypeScript: siTypescript,
        Tailwind: siTailwindcss,
      },
    },
    size: {
      description: 'Icon size in pixels',
      control: { type: 'range', min: 16, max: 64, step: 4 },
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimpIcon>;

export const Default: Story = {
  args: {
    icon: siGithub,
    size: 24,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default GitHub icon with standard size.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SimpIcon icon={siReact} size={16} />
      <SimpIcon icon={siReact} size={24} />
      <SimpIcon icon={siReact} size={32} />
      <SimpIcon icon={siReact} size={48} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons in different sizes.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SimpIcon icon={siTypescript} size={32} className="text-blue-600" />
      <SimpIcon icon={siReact} size={32} className="text-cyan-500" />
      <SimpIcon icon={siTailwindcss} size={32} className="text-teal-500" />
      <SimpIcon icon={siGithub} size={32} className="text-gray-800 dark:text-gray-200" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons with different colors using Tailwind classes.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <button className="rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
      <SimpIcon icon={siGithub} size={20} className="transition-transform hover:scale-110" />
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon used within an interactive button.',
      },
    },
  },
};
