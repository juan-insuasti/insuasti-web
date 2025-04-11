import type { Meta, StoryObj } from '@storybook/react';
import { Social } from '@/ui/Social';

export default {
  component: Social,
  title: 'Social',
  tags: ['autodocs'],
} satisfies Meta<typeof Social>;

export type Story = StoryObj<typeof Social>;

export const Default: Story = {
  args: {
    socialLinks: [
      {
        href: 'https://www.linkedin.com/in/jinsuasti/',
        src: '/social-linkedin.svg',
        alt: 'Linkedin Profile',
      },
      {
        href: 'https://github.com/locke189',
        src: '/social-github.svg',
        alt: 'Github Repositories',
      },
    ],
  },
};
