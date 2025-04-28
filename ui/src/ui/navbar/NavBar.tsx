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
    href: '#about',
  },
];

export function NavBar(): JSX.Element {
  return (
    <header className="fixed inset-0 z-50 mx-auto h-14 w-full bg-background shadow-md dark:shadow-md dark:shadow-foreground">
      <nav className="container mx-auto flex h-full items-center justify-between px-4">
        <Link href="/" className="flex h-full items-center">
          <Typography as="span" className="text-3xl text-primary" variant={'h2'}>
            Insuasti
          </Typography>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeMenu />
          <DesktopNavBar navItems={NavItems} />
          <MobileNavBar navItems={NavItems} />
        </div>
      </nav>
    </header>
  );
}
