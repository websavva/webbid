'use client';

import type { Product } from '#server/cms/collections/types';

import { useCartStore } from '@/hooks/use-cart-store';

import { Button, type ButtonProps } from '../UI/Button';

export interface CartButtonProps extends ButtonProps {
  product: Product;
}

export const CartButton = ({
  product,

  ...buttonProps
}: CartButtonProps) => {
  const {
    items,

    addItem,

    removeItem,
  } = useCartStore(({ addItem, removeItem, items }) => ({
    addItem,
    removeItem,
    items,
  }));

  const isProductAdded = items.some(({ id }) => product.id === id);

  const onClick = () => {
    if (isProductAdded) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <Button {...buttonProps} onClick={onClick}>
      {isProductAdded ? 'Remove from Cart' : 'Add to Cart'}
    </Button>
  );
};
