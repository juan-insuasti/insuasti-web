import type { Meta, StoryObj } from '@storybook/react';
import { Download, Mail, Plus, Trash2 } from 'lucide-react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic stories for each variant
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

// Size variations
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const Icon: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
    children: <Plus className="h-4 w-4" />,
  },
};

// With icons
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" />
        Send Email
      </>
    ),
  },
};

export const IconRight: Story = {
  args: {
    variant: 'outline',
    children: (
      <>
        Download
        <Download className="ml-2 h-4 w-4" />
      </>
    ),
  },
};

export const DestructiveWithIcon: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </>
    ),
  },
};

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const DisabledWithIcon: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" />
        Send Email
      </>
    ),
  },
};

// Loading state example
export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        Please wait
      </>
    ),
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
        <Button variant="destructive" disabled>
          <Trash2 className="mr-2 h-4 w-4" />
          Disabled with Icon
        </Button>
      </div>
    </div>
  ),
};

// AsChild example
export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <a href="#" className="no-underline">
        Link as Button
      </a>
    ),
  },
};
