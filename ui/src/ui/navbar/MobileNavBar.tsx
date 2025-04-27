'use client';
import { JSX, useState } from 'react';

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SquareMenu } from 'lucide-react';
import { ThemeMenu } from '../ThemeMenu';

import type { NavItem } from './NavBar';
import Link from 'next/link';
import { Typography } from '../Typography';

type MobileNavBarProps = {
  navItems: Array<NavItem>;
};

export function MobileNavBar({ navItems }: MobileNavBarProps): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <nav className="container mx-auto flex items-center justify-between px-4 py-2 sm:hidden">
      <Link href="/" className="flex items-center p-4">
        <Typography as="span" className="text-3xl font-bold text-primary" variant={'h2'}>
          Insuasti
        </Typography>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeMenu />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SquareMenu />
            </Button>
          </SheetTrigger>
          <SheetContent title="Menu">
            <SheetTitle className="invisible">Menu</SheetTitle>
            <ul className="flex flex-col space-y-4 py-14 align-middle">
              {navItems.map((item) => (
                <li key={item.title} className="flex items-center" onClick={() => setOpen(false)}>
                  <Link href={item.href} className="hover:text-primary">
                    <Typography variant={'h3'} as="p" className="font-normal">
                      {item.title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
