import type { Meta, StoryObj } from '@storybook/react';
import { SocialLinks } from '@/ui/SocialLinks';
import { SOCIAL_LINKS } from '@/lib/consts';

export default {
  component: SocialLinks,
  title: 'Social',
  tags: ['autodocs'],
} satisfies Meta<typeof SocialLinks>;

export type Story = StoryObj<typeof SocialLinks>;

export const Default: Story = {
  args: {
    socialLinks: SOCIAL_LINKS,
  },
};
