import Link from 'next/link';
import { JSX } from 'react';
import type { NavItem } from './NavBar';
import { ThemeMenu } from '../ThemeMenu';
import { Typography } from '../Typography';

type DesktopNavBarProps = {
  navItems: Array<NavItem>;
};

export function DesktopNavBar({ navItems }: DesktopNavBarProps): JSX.Element {
  return (
    <nav className="container mx-auto hidden items-center justify-between px-4 py-2 sm:flex">
      <Link href="/" className="flex items-center p-4">
        <Typography as="span" variant="h2" className="text-3xl font-bold text-primary">
          Insuasti
        </Typography>
      </Link>
      <ul className="flex space-x-4 align-middle">
        <li>
          <ThemeMenu />
        </li>
        {navItems.map((item) => (
          <li key={item.title} className="flex items-center">
            <Link href={item.href} className="hover:text-primary">
              <Typography variant={'p'} as="p">
                {item.title}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
