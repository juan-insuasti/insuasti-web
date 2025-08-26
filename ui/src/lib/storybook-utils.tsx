import { JSX } from 'react';

import { useTheme } from 'next-themes';

// Decorators

type Theme = 'light' | 'dark' | 'system';

export function withTheme(theme: Theme) {
  function ThemeDecorator(Story: () => JSX.Element) {
    const { setTheme } = useTheme();
    setTheme(theme);
    return <Story />;
  }

  return ThemeDecorator;
}
