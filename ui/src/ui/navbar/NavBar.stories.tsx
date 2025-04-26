import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from './NavBar';
import { ThemeProvider } from '@/components/theme-provider';

export default {
  component: NavBar,
  title: 'NavBar',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-screen w-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {Story()}
        </ThemeProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof NavBar>;

export type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: {},
};
