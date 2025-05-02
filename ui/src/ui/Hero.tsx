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
      <div className="duration-2000 absolute inset-0 -z-10 inline-flex h-full w-full animate-pulse items-center justify-center overflow-hidden blur-3xl filter">
        <div className="duration-3000 absolute ml-[-3em] aspect-square h-full animate-spin rounded-full bg-gradient-to-tr from-primary to-background opacity-20 blur-xl dark:to-secondary dark:opacity-35" />
        <div className="duration-3000 absolute aspect-square h-full animate-spin rounded-full bg-gradient-to-bl from-background to-primary opacity-20 blur-3xl dark:from-secondary dark:opacity-35" />
      </div>
      <Typography as="h1" variant="h1" className="text-5xl leading-tight md:text-7xl lg:text-8xl">
        {title}
      </Typography>
      <Typography as="p" variant="h3" className="mt-1 font-inter font-normal md:mt-2 lg:mt-4">
        {description}
      </Typography>
      {children}
    </SectionFullPage>
  );
};
