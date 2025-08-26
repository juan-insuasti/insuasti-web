import type { Meta, StoryObj } from '@storybook/react';
import { TechBadge, type TechBadgeProps } from './TechBadge';

const meta: Meta<typeof TechBadge> = {
  title: 'Projects/TechBadge',
  component: TechBadge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Technology badge displaying an icon (where available) and optional label with tooltip.',
      },
    },
  },
  argTypes: {
    tech: { control: 'text', description: 'Tech string identifier (case-insensitive)' },
    withLabel: { control: 'boolean', description: 'Show the text label next to the icon' },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { tech: 'nextjs', withLabel: true } satisfies TechBadgeProps,
};

export const WithoutLabel: Story = {
  args: { tech: 'react', withLabel: false } satisfies TechBadgeProps,
};

export const AllKnown: Story = {
  render: () => {
    const techArray = [
      'nextjs',
      'react',
      'typescript',
      'tailwindcss',
      'shadcnui',
      'radix-ui',
      'openai',
      'vercel',
      'node',
      'css',
      'esp32',
      'iot',
      'postgres',
      'supabase',
      'react-query',
    ];
    return (
      <div className="flex flex-wrap gap-2">
        {techArray.map((t) => (
          <TechBadge key={t} tech={t} />
        ))}
      </div>
    );
  },
};

export const UnknownTech: Story = {
  args: { tech: 'graphql', withLabel: true } satisfies TechBadgeProps,
  parameters: {
    docs: {
      description: {
        story:
          'Unknown technology falls back to simple label with first letter placeholder icon styling.',
      },
    },
  },
};

export const Dense: Story = {
  render: () => (
    <div className="flex flex-wrap gap-1">
      {[
        'nextjs',
        'react',
        'typescript',
        'tailwindcss',
        'openai',
        'vercel',
        'node',
        'css',
        'esp32',
        'iot',
      ].map((t) => (
        <TechBadge key={t} tech={t} withLabel={false} />
      ))}
    </div>
  ),
};
