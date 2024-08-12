import type { PropsWithChildren } from 'react';

import { Container } from '@/components/UI/Container';

export default function ProductsLayout({ children }: PropsWithChildren) {
  return <Container className='mx-auto py-16'>{children}</Container>;
}
