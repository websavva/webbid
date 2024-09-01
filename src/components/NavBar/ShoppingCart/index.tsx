'use client';

import { ShoppingBagIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useOnFullPathUpdate } from '@/hooks/use-full-path';
import type { DefineProps } from '@/types';
import { Sheet, SheetTrigger, SheetContent } from '@/components/UI/Sheet';
import { Button } from '@/components/UI/Button';
import { useCartStore } from '@/hooks/use-cart-store';

import { Cart } from '@/components/Cart';
import { useToggle } from '@/hooks/use-toggle';

export type ShoppingCartProps = DefineProps<{}>;

export function ShoppingCart({}: ShoppingCartProps) {
  const pathname = usePathname();

  const itemsCount = useCartStore((state) => state.items.length);

  const { value: open, onUpdate: onOpenChange, onDeactivate } = useToggle();

  useOnFullPathUpdate(() => {
    onDeactivate();
  }, [onDeactivate]);

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (pathname === '/cart' && open) return;

        onOpenChange(open);
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='flex w-max items-center max-sm:hover:bg-transparent sm:px-2'
        >
          <ShoppingBagIcon className='mr-2 size-5 shrink-0 cursor-pointer' />

          <span>{itemsCount}</span>
        </Button>
      </SheetTrigger>

      <SheetContent className='sm:max-w-xl'>
        <Cart />
      </SheetContent>
    </Sheet>
  );
}
