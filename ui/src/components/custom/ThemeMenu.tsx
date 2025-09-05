'use client';

import * as React from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/shad-button';

export function ThemeMenu() {
  const { setTheme } = useTheme();

  return (
    <div className="block">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className="cursor-pointer"
        onClick={() => {
          setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        }}
      >
        <Sun className="rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />

        <Moon className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-300" />

        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
