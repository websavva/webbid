import type { Metadata } from 'next';

import { Cart } from '@/components/Cart';

export const metadata: Metadata = {
  title: 'Your cart',

  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return (
    <div className='mx-auto max-w-[90%] py-10 sm:max-w-2xl sm:py-16'>
      <Cart isPage />
    </div>
  );
}
