import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log Out',
};

export const middlewares = ['auth'];

export { default as default } from './page_client';
