import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '@/ui/Hero';

export default {
	component: Hero,
	title: 'Hero',
	tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export type Story = StoryObj<typeof Hero>;

export const Default: Story = {
	args: {
		title: (
			<>
				Hi, I&apos;m <span className="text-green-700">Juan Insuasti</span>!
			</>
		),
		description: 'A Frontend Developer turning design concepts into seamless digital experiences.',
	},
};
