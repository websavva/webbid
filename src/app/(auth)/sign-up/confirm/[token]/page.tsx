import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registration Confirmation',
};

export const middlewares = ['guest'];

export { default as default } from './page_client';
