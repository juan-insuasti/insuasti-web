import type { Metadata } from 'next';

import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { fira, inter, fjallaOne } from '@/lib/fonts';
import { GlobalFooter } from '@/ui/GlobalFooter';

export const metadata: Metadata = {
  title: 'Homepage | Insuasti.com',
  description: "Juan Insuasti's personal website",
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
