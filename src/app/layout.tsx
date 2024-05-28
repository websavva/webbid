import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { NavBar } from '@/components/NavBar';
import { cn } from '@/lib/utils/cn';
import { loadAppContext } from '@/contexts/app/load';
import { AppContextProvider } from '@/contexts/app/Provider';
import { Toaster } from '@/components/ui/Toaster';

import './globals.css';
import { requestHeaders } from '@/lib/utils/request-headers';
import { Footer } from '@/components/ui/Footer';

const intInter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: [
    {
      url: '/logo.svg',
      rel: 'icon',
      type: 'image/svg+xml',
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialAppContextValue = await loadAppContext(requestHeaders());

  return (
    <html lang='en'>
      <body className={cn('font-sans relative', intInter.className)}>
        <div className='flex flex-col min-h-screen css-var-[--nav-bar-height=5rem]'>
          <AppContextProvider initialValue={initialAppContextValue}>
            <NavBar className='w-full h-[var(--nav-bar-height)]' />

            <main className='min-h-[calc(100vh-var(--nav-bar-height))]'>{children}</main>

            <Footer />
          </AppContextProvider>
        </div>

        <Toaster />
      </body>
    </html>
  );
}
