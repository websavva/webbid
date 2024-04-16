import type { PropsWithChildren } from 'react';

import { Container } from '@/components/ui/Container';

export default function AuthLayout({ children }: PropsWithChildren) {

  return (
    <Container className='py-20 flex flex-col items-center mx-auto'>
      {children}
    </Container>
  );
}
