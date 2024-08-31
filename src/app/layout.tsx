import type { Metadata } from 'next';

import Layout from '@/components/UI/Layout';
import { NavBar } from '@/components/NavBar';
import { loadAppContext } from '@/contexts/app/load';
import { AppContextProvider } from '@/contexts/app/Provider';
import { Toaster } from '@/components/UI/Toaster';

import { requestHeaders } from '@/lib/utils/request-headers';
import { Footer } from '@/components/UI/Footer';
import { publicEnv } from '#server/env/public';

import './globals.css';

const defaultMetadataFields = {
  title: `${publicEnv.COMPANY_NAME} - Digital marketplace`,
  description: `${publicEnv.COMPANY_NAME} is one of the leading and cutting-edge digital marketplace in the whole Internet`,
};

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.BASE_URL),

  // common tags
  generator: 'Next.js',
  applicationName: publicEnv.COMPANY_NAME,
  referrer: 'origin-when-cross-origin',
  keywords: ['Digital marketplace', 'Internet Shop', 'Buy Images', 'Buy Icons'],
  authors: [{ name: 'WebSavva', url: 'https://github.com/websavva' }],
  creator: 'WebSavva',
  publisher: 'WebSavva',

  title: {
    default: defaultMetadataFields.title,
    template: `%s | ${publicEnv.COMPANY_NAME}`,
  },

  description: defaultMetadataFields.description,

  icons: [
    {
      url: '/logo.svg',
      rel: 'icon',
      type: 'image/svg+xml',
    },
  ],

  openGraph: {
    title: defaultMetadataFields.title,
    description: defaultMetadataFields.description,
    url: publicEnv.BASE_URL,
    siteName: publicEnv.COMPANY_NAME,
    images: [new URL('og.png', publicEnv.BASE_URL)],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialAppContextValue = await loadAppContext(requestHeaders());

  return (
    <Layout className='css-var-[--nav-bar-height=5rem]'>
      <AppContextProvider initialValue={initialAppContextValue}>
        <NavBar className='w-full' />

        <main className='min-h-[calc(100vh-var(--nav-bar-height))] pt-[var(--nav-bar-height)]'>
          {children}
        </main>

        <Footer />
      </AppContextProvider>

      <Toaster />
    </Layout>
  );
}
