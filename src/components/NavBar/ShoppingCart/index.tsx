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
          className='flex items-center w-max sm:px-2 max-sm:hover:bg-transparent'
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
