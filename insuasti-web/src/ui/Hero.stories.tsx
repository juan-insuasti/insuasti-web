import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '@/ui/Hero';

export default {
  component: Hero,
  title: 'Hero',
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="flex min-h-screen flex-col items-start justify-center px-4 md:px-8 lg:px-16">
        <Story />
      </div>
    ),
  ],
};
