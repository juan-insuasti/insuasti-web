import React, { JSX } from 'react';

import Link from 'next/link';

type NavItem = {
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
    <>
      <header className="fixed top-0 z-50 flex h-14 w-full justify-between bg-white shadow-md">
        <nav className="container mx-auto flex items-center justify-between px-4 py-2">
          <Link href="/" className="flex items-center p-4">
            <span className="text-2xl font-bold text-primary">Juan Insuasti</span>
          </Link>
          <ul className="flex space-x-4">
            {NavItems.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="hover:text-primary">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
