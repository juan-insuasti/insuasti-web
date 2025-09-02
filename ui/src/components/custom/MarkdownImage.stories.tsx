import type { Meta, StoryObj } from '@storybook/react';

import { MarkdownImage } from '@ui/MarkdownImage';

const meta: Meta<typeof MarkdownImage> = {
  title: 'UI/MarkdownImage',
  component: MarkdownImage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: 'Image source URL',
      control: 'text',
    },
    alt: {
      description: 'Alternative text for the image',
      control: 'text',
    },
    title: {
      description: 'Image title (optional caption)',
      control: 'text',
    },
    width: {
      description: 'Image width',
      control: 'number',
    },
    height: {
      description: 'Image height',
      control: 'number',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: '/Insua2.jpg',
    alt: 'Sample image from public folder',
    width: 400,
    height: 300,
  },
};

export const WithCaption: Story = {
  args: {
    src: '/Insua2.jpg',
    alt: 'Sample image with caption',
    title: 'This is a caption for the image that appears below it',
    width: 400,
    height: 300,
  },
};

export const LargeImage: Story = {
  args: {
    src: '/Insua2.jpg',
    alt: 'Large sample image',
    title: 'A large image example',
    width: 800,
    height: 600,
  },
};

export const BrokenImage: Story = {
  args: {
    src: '/non-existent-image.jpg',
    alt: 'This image does not exist',
    title: 'This should show an error state',
    width: 400,
    height: 300,
  },
};
