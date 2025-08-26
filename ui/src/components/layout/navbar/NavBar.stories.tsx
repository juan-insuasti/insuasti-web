import type { Meta, StoryObj } from '@storybook/react';

import { NavBar } from './NavBar';

export default {
  component: NavBar,
  title: 'NavBar',
  tags: ['autodocs'],
  decorators: [(Story) => <div className="h-screen w-full">{Story()}</div>],
} satisfies Meta<typeof NavBar>;

export type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: {},
};
