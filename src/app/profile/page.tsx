import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Profile',

  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export const middlewares = ['auth'];

export { default as default } from './page_client';
