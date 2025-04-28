'use client';
import { JSX, useState } from 'react';

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SquareMenu } from 'lucide-react';

import type { NavItem } from './NavBar';
import Link from 'next/link';
import { Typography } from '../Typography';

type MobileNavBarProps = {
  navItems: Array<NavItem>;
};

export function MobileNavBar({ navItems }: MobileNavBarProps): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div className="block w-full sm:hidden">
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
  );
}
