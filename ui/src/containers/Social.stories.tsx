import type { Meta, StoryObj } from '@storybook/react';
import { SocialLinks } from '@/containers/SocialLinks';
import { SOCIAL_LINKS } from '@/lib/consts';
import { withTheme } from '@/lib/storybook-utils';

export default {
  component: SocialLinks,
  title: 'Social',
  tags: ['autodocs'],
  decorators: [withTheme('light')],
} satisfies Meta<typeof SocialLinks>;

export type Story = StoryObj<typeof SocialLinks>;

export const Default: Story = {
  args: {
    socialLinks: SOCIAL_LINKS,
  },
};

export const Dark: Story = {
  args: {
    socialLinks: SOCIAL_LINKS,
  },
  decorators: [withTheme('dark')],
};
