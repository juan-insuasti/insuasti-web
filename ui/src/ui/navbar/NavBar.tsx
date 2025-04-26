import React, { JSX } from 'react';

import { MobileNavBar } from './MobileNavBar';
import { DesktopNavBar } from './DesktopNavBar';

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
    <header className="fixed top-0 z-50 flex h-14 w-full justify-between bg-background shadow-md dark:shadow-md dark:shadow-foreground">
      <DesktopNavBar navItems={NavItems} />
      <MobileNavBar navItems={NavItems} />
    </header>
  );
}
