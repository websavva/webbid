import type { Metadata } from 'next';

import { Cart } from '@/components/Cart';

export const metadata: Metadata = {
  title: 'Your cart',
  description: '',

  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return (
    <div className='mx-auto max-w-[90%] sm:max-w-2xl py-10 sm:py-16'>
      <Cart isPage />
    </div>
  );
}
