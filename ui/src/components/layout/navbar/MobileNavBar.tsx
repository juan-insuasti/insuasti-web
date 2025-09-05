'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';

import { SquareMenu } from 'lucide-react';

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@ui/sheet';
import { ThemeMenu } from '@ui/ThemeMenu';
import { Typography } from '@ui/Typography';

import { Button } from '@/components/ui/shad-button';

import { GlobalFooter } from '../GlobalFooter';
import type { NavItem } from './NavBar';

type MobileNavBarProps = {
  navItems: Array<NavItem>;
};

export function MobileNavBar({ navItems }: MobileNavBarProps): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div className="block sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" aria-label="Open menu" size={'icon'}>
            <SquareMenu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent title="Menu" className="p-0 ">
          <SheetTitle className="invisible absolute">Menu</SheetTitle>
          <div className="flex h-full flex-col justify-between">
            <ul className="flex flex-col space-y-4 py-14 align-middle">
              {navItems.map((item) => (
                <li key={item.title} className="flex items-center" onClick={() => setOpen(false)}>
                  <Link
                    href={item.href}
                    className="border-l-8 border-b-2 border-gray-500-muted p-4 hover:border-primary w-full"
                  >
                    <Typography
                      variant={'h2'}
                      as="p"
                      className="font-semibold! text-foreground! hover:text-primary! transition-all"
                    >
                      {item.title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
            <GlobalFooter />
          </div>
          <ThemeMenu />
        </SheetContent>
      </Sheet>
    </div>
  );
}
