'use client';

import type { Product } from '#server/cms/collections/types';

import { useCart } from '@/hooks/use-cart';

import { Button, type ButtonProps } from '../ui/Button';

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
  } = useCart();

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
