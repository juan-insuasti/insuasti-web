import React from 'react';
import type { Preview } from '@storybook/react';

import { Fira_Code } from 'next/font/google';
import '@/app/globals.css';

const fira = Fira_Code({
  weight: '400',
  subsets: ['latin'],
});

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${fira.className} antialiased`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
