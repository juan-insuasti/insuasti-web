import Link from 'next/link';
import { JSX } from 'react';
import type { NavItem } from './NavBar';
import { Typography } from '../Typography';

type DesktopNavBarProps = {
  navItems: Array<NavItem>;
};

export function DesktopNavBar({ navItems }: DesktopNavBarProps): JSX.Element {
  return (
    <ul className="hidden align-middle sm:flex gap-8">
      {navItems.map((item) => (
        <li key={item.title} className="flex items-center ">
          <Link href={item.href} className="hover:text-primary">
            <Typography variant={'p'} as="p">
              {item.title}
            </Typography>
          </Link>
        </li>
      ))}
    </ul>
  );
}
