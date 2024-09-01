import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { Container } from '@/components/UI/Container';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Container className='mx-auto flex flex-col items-center py-10 sm:py-20'>
      {children}
    </Container>
  );
}
