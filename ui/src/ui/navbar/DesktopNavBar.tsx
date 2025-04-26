import Link from 'next/link';
import { JSX } from 'react';
import type { NavItem } from './NavBar';
import { ThemeMenu } from '../ThemeMenu';

type MobileNavBarProps = {
  navItems: Array<NavItem>;
};

export function DesktopNavBar({ navItems }: MobileNavBarProps): JSX.Element {
  return (
    <nav className="container mx-auto hidden items-center justify-between px-4 py-2 sm:flex">
      <Link href="/" className="flex items-center p-4">
        <span className="text-2xl font-bold text-primary">Insuasti</span>
      </Link>
      <ul className="flex space-x-4 align-middle">
        <li>
          <ThemeMenu />
        </li>
        {navItems.map((item) => (
          <li key={item.title} className="flex items-center">
            <Link href={item.href} className="hover:text-primary">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
