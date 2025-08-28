import React, { JSX } from 'react';
import Link from 'next/link';

import { LogoIcon } from '@ui/customIcons/LogoIcon';
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
    <header className="fixed inset-0 z-50 mx-auto h-14 w-full bg-background opacity-90 shadow-md">
      <nav className="container mx-auto flex h-full items-center justify-between px-4">
        <Link href="/" className="relative flex h-10 w-10 items-center justify-center gap-4">
          <LogoIcon className="h-9 w-9 fill-foreground flex-auto flex-shrink-0 flex-grow-0" />
          <Typography as="span" className="translate-y-[2px] text-4xl text-primary" variant={'h2'}>
            Insuasti
          </Typography>
        </Link>

        <div className="flex items-center gap-4">
          <DesktopNavBar navItems={NavItems} />
          <MobileNavBar navItems={NavItems} />
          <div className="ml-4 hidden sm:block">
            <ThemeMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
