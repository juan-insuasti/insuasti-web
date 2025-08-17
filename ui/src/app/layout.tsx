import type { Metadata } from 'next';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { fira, inter, fjallaOne } from '@/lib/fonts';
import { GlobalFooter } from '@/ui/GlobalFooter';

export const metadata: Metadata = {
  title: 'insuasti.com | Juan Insuasti - Senior Frontend Developer',
  description: "Frontend developer's portfolio and blog from Colombia",
  openGraph: {
    title: 'insuasti.com | Juan Insuasti - Senior Frontend Developer',
    description: 'A playground site where I showcase my projects and host my personal blog.',
    url: 'https://insuasti.com',
    siteName: 'Insuasti.com',
    images: [
      {
        url: 'https://insuasti.com/og.png?v=2',
        width: 1200,
        height: 630,
        alt: "Juan Insuasti's Portfolio",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  authors: [{ name: 'Juan Insuasti', url: 'https://insuasti.com' }],
  twitter: {
    card: 'summary_large_image',
    site: '@JuanInsuasti4',
    creator: '@JuanInsuasti4',
    title: 'insuasti.com | Juan Insuasti - Frontend Developer',
    description: 'A playground site where I showcase my projects and host my personal blog.',
    images: ['https://insuasti.com/og.png?v=2'],
  },
  metadataBase: new URL('https://insuasti.com'),
  alternates: {
    canonical: '/',
  },
  themeColor: '#008000', // change to your brand color
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${fira.variable} ${fjallaOne.variable} antialiased`}>
        {' '}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <>
            {children}
            <GlobalFooter />
          </>
        </ThemeProvider>
      </body>
    </html>
  );
}
