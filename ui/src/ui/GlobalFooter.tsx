import React from 'react';
import { Typography } from '@/ui/Typography';

import '@/app/globals.css';

export const GlobalFooter = () => {
  return (
    <footer className="relative w-full">
      <div className="opacity-gradient-top-to-bottom absolute top-[-69px] h-[70px] w-full">
        <div className="wave-3 absolute bottom-0 h-[70px] w-full bg-primary opacity-30" />
        <div className="wave-1 absolute bottom-0 h-[50px] w-full bg-primary opacity-60" />
        <div className="wave-2 absolute bottom-0 h-[30px] w-full bg-primary" />
      </div>
      <div className="bg-primary">
        <div className="container flex flex-col items-center justify-center gap-3 py-6">
          <Typography as="p" variant={'p'} className="text-center text-sm text-background">
            © {new Date().getFullYear()} Juan Insuasti. All rights reserved.
          </Typography>
          <Typography as="p" variant={'p'} className="text-center text-sm text-background">
            Handcrafted with <span className="text-red-500">❤️</span> by Juan Insuasti
          </Typography>
        </div>
      </div>
    </footer>
  );
};
