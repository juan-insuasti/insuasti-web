import React, { JSX } from 'react';
import Link from 'next/link';

import { LogoIcon } from '@ui/icons/LogoIcon';
import { ThemeMenu } from '@ui/ThemeMenu';
import { Typography } from '@ui/Typography';

import { DesktopNavBar } from './DesktopNavBar';
import { MobileNavBar } from './MobileNavBar';

export type NavItem = {
  title: string;
  href: string;
};

const NavItems: Array<NavItem> = [
  {
    title: 'About Me',
    href: '/#about',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Projects',
    href: '/projects',
  },
];

export function NavBar(): JSX.Element {
  return (
    <header className="fixed inset-0 mx-auto z-10 h-14 w-full bg-background/60 ">
      <div className="absolute inset-0 h-full -z-1 w-full backdrop-blur-sm" />
      <nav className="container mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center sm:gap-12 md:gap-24">
          <Link href="/" className="flex  items-center justify-center gap-4">
            <LogoIcon className="h-9 w-9 fill-foreground flex-auto shrink-0 grow-0" />
            <Typography
              as="span"
              className="text-3xl translate-y-[2px] sm:block: sm:text-4xl text-primary"
              variant={'h2'}
            >
              Insuasti
            </Typography>
          </Link>

          <DesktopNavBar navItems={NavItems} />
        </div>
        <div className="flex items-center justify-center gap-4">
          <ThemeMenu />
          <MobileNavBar navItems={NavItems} />
        </div>
      </nav>
    </header>
  );
}
