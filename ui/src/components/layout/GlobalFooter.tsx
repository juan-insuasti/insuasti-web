import React from 'react';

import { Typography } from '@ui/Typography';

//TODO: is this really needed?
import '@/app/globals.css';

import { LogoIcon } from '@ui/icons/LogoIcon';

export const GlobalFooter = () => {
  return (
    <footer className="relative w-full">
      <section className="mb-16 sm:mb-32 flex flex-col items-center justify-center gap-4 text-center">
        <LogoIcon
          className="h-14 w-14 sm:h-16 sm:w-16 fill-foreground"
          aria-label="Logo of a floppy disk and a cat"
        />
      </section>
      <div className="relative w-full">
        <div className="opacity-gradient-top-to-bottom absolute top-[-69px] h-[70px] w-full">
          <div className="wave-3 absolute bottom-0 h-[70px] w-full bg-primary opacity-30" />
          <div className="wave-1 absolute bottom-0 h-[50px] w-full bg-primary opacity-60" />
          <div className="wave-2 absolute bottom-0 h-[30px] w-full bg-primary" />
        </div>
        <div className="w-full bg-primary">
          <div className="flex flex-col items-center justify-center gap-3 py-6">
            <Typography as="p" variant={'p'} className="text-center text-xs sm:text-sm text-white!">
              © {new Date().getFullYear()} Juan Insuasti. All rights reserved.
            </Typography>
            <Typography as="p" variant={'p'} className="text-center text-xs sm:text-sm text-white!">
              Handcrafted with <span className="text-red-500">❤️</span> by Juan Insuasti
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
};
