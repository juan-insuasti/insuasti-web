import type { Meta, StoryObj } from '@storybook/react';

import { withTheme } from '@/lib/storybook-utils';
import { GlobalFooter } from './GlobalFooter';

export default {
  component: GlobalFooter,
  title: 'GlobalFooter',
  tags: ['autodocs'],
  decorators: [
    withTheme('light'),
    (Story) => (
      <div>
        <div className="h-[calc(100vh - 100px)]"></div>
        {Story()}
      </div>
    ),
  ],
} satisfies Meta<typeof GlobalFooter>;

export type Story = StoryObj<typeof GlobalFooter>;

export const Default: Story = {};

export const Dark: Story = {
  decorators: [withTheme('dark')],
};
