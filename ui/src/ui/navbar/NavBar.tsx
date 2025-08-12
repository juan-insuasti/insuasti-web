import React, { JSX } from 'react';

import { MobileNavBar } from './MobileNavBar';
import { DesktopNavBar } from './DesktopNavBar';
import Link from 'next/link';
import { Typography } from '../Typography';
import { ThemeMenu } from '../ThemeMenu';

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
    <header className="fixed inset-0 z-50 mx-auto h-14 w-full bg-background shadow-md  opacity-90">
      <nav className="container mx-auto flex h-full items-center justify-between px-4">
        <Link href="/" className="flex h-full items-center">
          <Typography as="span" className="sm:text-4xl text-primary" variant={'h2'}>
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
