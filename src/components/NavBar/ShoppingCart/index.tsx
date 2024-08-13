'use client';

import { useState } from 'react';
import { ShoppingBagIcon } from 'lucide-react';

import { useOnFullPathUpdate } from '@/hooks/use-full-path';
import type { DefineProps } from '@/types';
import { Sheet, SheetTrigger, SheetContent } from '@/components/UI/Sheet';
import { Button } from '@/components/UI/Button';
import { useCartStore } from '@/hooks/use-cart-store';

import { Cart } from '@/components/Cart';

export type ShoppingCartProps = DefineProps<{}>;

export function ShoppingCart({}: ShoppingCartProps) {
  const itemsCount = useCartStore((state) => state.items.length);

  const [isOpened, setIsOpened] = useState(false);

  useOnFullPathUpdate(() => {
    setIsOpened(false);
  });

  return (
    <Sheet open={isOpened} onOpenChange={(isOpened) => setIsOpened(isOpened)}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='flex items-center w-auto px-2'
        >
          <ShoppingBagIcon className='w-5 h-5 cursor-pointer shrink-0 mr-2' />

          <span>{itemsCount}</span>
        </Button>
      </SheetTrigger>

      <SheetContent className='sm:max-w-xl'>
        <Cart />
      </SheetContent>
    </Sheet>
  );
}
