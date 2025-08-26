import Link from 'next/link';
import { JSX } from 'react';
import type { NavItem } from './NavBar';
import { Typography } from '../../ui/Typography';

type DesktopNavBarProps = {
  navItems: Array<NavItem>;
};

export function DesktopNavBar({ navItems }: DesktopNavBarProps): JSX.Element {
  return (
    <ul className="hidden gap-8 align-middle sm:flex">
      {navItems.map((item) => (
        <li key={item.title} className="flex items-center">
          <Link href={item.href} className="hover:text-primary">
            <Typography variant="h2" as="p" className="!text-2xl !font-semibold !text-foreground">
              {item.title}
            </Typography>
          </Link>
        </li>
      ))}
    </ul>
  );
}
