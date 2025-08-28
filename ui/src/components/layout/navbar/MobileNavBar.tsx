'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';

import { SquareMenu } from 'lucide-react';

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@ui/sheet';
import { ThemeMenu } from '@ui/ThemeMenu';
import { Typography } from '@ui/Typography';

import { Button } from '@/components/ui/shad-button';

import type { NavItem } from './NavBar';

type MobileNavBarProps = {
  navItems: Array<NavItem>;
};

export function MobileNavBar({ navItems }: MobileNavBarProps): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div className="block w-full sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" aria-label="Open menu">
            <SquareMenu />
          </Button>
        </SheetTrigger>
        <SheetContent title="Menu">
          <SheetTitle className="invisible">Menu</SheetTitle>
          <ul className="flex flex-col space-y-4 py-14 align-middle">
            {navItems.map((item) => (
              <li key={item.title} className="flex items-center" onClick={() => setOpen(false)}>
                <Link href={item.href} className="hover:text-primary">
                  <Typography variant={'h2'} as="p" className="!font-semibold !text-foreground">
                    {item.title}
                  </Typography>
                </Link>
              </li>
            ))}
          </ul>
          <ThemeMenu />
        </SheetContent>
      </Sheet>
    </div>
  );
}
