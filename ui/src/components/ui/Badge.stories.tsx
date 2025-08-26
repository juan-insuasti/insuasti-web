import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a longer badge text',
  },
};

export const TagExamples: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">react</Badge>
      <Badge variant="secondary">typescript</Badge>
      <Badge variant="outline">frontend</Badge>
      <Badge variant="secondary">nextjs</Badge>
      <Badge variant="default">performance</Badge>
      <Badge variant="outline">optimization</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="default" className="hover:bg-primary/80">
          Hoverable Default
        </Badge>
        <Badge variant="secondary" className="hover:bg-secondary/80">
          Hoverable Secondary
        </Badge>
        <Badge variant="outline" className="hover:bg-muted">
          Hoverable Outline
        </Badge>
      </div>
    </div>
  ),
};
