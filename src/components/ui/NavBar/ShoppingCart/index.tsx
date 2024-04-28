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
import { formatPrice } from '@/lib/formatters';
import { useCart } from '@/hooks/use-cart';
import { calculatOrderSum } from '@/lib/utils/finance/calculate-order-sum';

export type ShoppingCartProps = DefineProps<{}>;

export function ShoppingCart({}: ShoppingCartProps) {
  const {
    items,
    items: { length: itemsCount },
  } = useCart();

  const {
    totalPrice,
    fee,

    totalPriceWithFee,
  } = calculatOrderSum(items);

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

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{`Cart (${itemsCount})`}</SheetTitle>
        </SheetHeader>

        {itemsCount > 0 && (
          <>
            <div className='flex flex-col text-lg space-y-5 my-5'>
              <div className='flex items-center justify-between'>
                <span>Shipping</span>
                <span>{formatPrice(0)}</span>
              </div>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Button className='w-full'>Checkout</Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}

        {itemsCount === 0 && (
          <>
            <div className='mt-8 mb-2 text-center flex flex-col items-center text-slate-500'>
              <ShoppingBasketIcon className='w-14 h-14 mb-5' />
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <Link
                  href='/catalog'
                  className='mx-auto hover:underline text-lg text-blue-500'
                >
                  Go to catalog
                </Link>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
