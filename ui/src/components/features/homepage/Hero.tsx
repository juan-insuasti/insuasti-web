import React from 'react';

import { SectionFullPage } from '@containers/SectionFullPage';
import { Typography } from '@ui/Typography';

//TODO: Is this needed?
import '@/app/globals.css';

interface HeroProps {
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
}

export const Hero = ({ title, description, children }: HeroProps) => {
  return (
    <SectionFullPage className="relative">
      <div className="absolute inset-0 -z-10 inline-flex h-full w-full animate-pulse items-center justify-center overflow-hidden blur-3xl filter duration-3000">
        <div className="absolute ml-[-3em] aspect-square h-full animate-spin rounded-full bg-linear-to-tr from-primary to-background opacity-20 blur-xl duration-3000 dark:to-secondary dark:opacity-35" />
        <div className="absolute aspect-square h-full animate-spin rounded-full bg-linear-to-bl from-background to-primary opacity-20 blur-3xl duration-3000 dark:from-secondary dark:opacity-35" />
      </div>
      <Typography as="h1" variant="h1" className="text-5xl leading-tight md:!text-7xl lg:!text-8xl">
        {title}
      </Typography>
      <Typography
        as="p"
        variant="h3"
        className="mt-1 font-inter !font-normal text-foreground md:mt-2 lg:mt-4"
      >
        {description}
      </Typography>
      {children}
    </SectionFullPage>
  );
};
