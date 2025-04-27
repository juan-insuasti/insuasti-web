import React from 'react';
import { SectionFullPage } from '@/ui/SectionFullPage';
import { Typography } from '@/ui/Typography';

import '@/app/globals.css';

interface HeroProps {
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
}

export const Hero = ({ title, description, children }: HeroProps) => {
  return (
    <SectionFullPage className="relative">
      <div className="absolute inset-0 -z-10 inline-flex h-full w-full animate-pulse items-center justify-center overflow-hidden blur-3xl filter">
        <div className="absolute ml-[-3em] aspect-square h-full animate-spin rounded-full bg-gradient-to-tr from-primary to-background opacity-20 blur-xl dark:to-secondary" />
        <div className="absolute aspect-square h-full animate-spin rounded-full bg-gradient-to-bl from-background to-primary opacity-20 blur-3xl dark:from-secondary" />
      </div>
      <Typography as="h1" variant="h1">
        {title}
      </Typography>
      <Typography as="p" variant="h2" className="mt-1 font-normal md:mt-2 lg:mt-4">
        {description}
      </Typography>
      {children}
    </SectionFullPage>
  );
};
