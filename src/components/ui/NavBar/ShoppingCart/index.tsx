'use client';

import { ShoppingBagIcon, ShoppingBasketIcon } from 'lucide-react';
import Link from 'next/link';

import type { DefineProps } from '@/types';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/Sheet';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/hooks/use-cart-store';

import { Cart } from '@/components/Cart';

export type ShoppingCartProps = DefineProps<{}>;

export function ShoppingCart({}: ShoppingCartProps) {
  const itemsCount = useCartStore((state) => state.items.length);

  return (
    <Sheet>
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
