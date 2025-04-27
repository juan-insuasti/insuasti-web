import { Fira_Code } from 'next/font/google';
import { Poppins } from 'next/font/google';
import { Bebas_Neue } from 'next/font/google';
import { Inter } from 'next/font/google';

export const fira = Fira_Code({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-fira',
});

export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

export const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});
