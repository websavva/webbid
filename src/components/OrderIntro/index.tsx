'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useCartStore } from '@/hooks/use-cart-store';
import { trpcClient } from '@/lib/trpc';

import { OrderInfo, type OrderInfoProps } from '../OrderInfo';

export type OrderIntroProps = {
  watchStatus?: boolean;
  shouldEmptyOutCartCartOnMount?: boolean;
} & OrderInfoProps;

export const OrderIntro = ({
  watchStatus,
  shouldEmptyOutCartCartOnMount,
  ...orderInfoProps
}: OrderIntroProps) => {
  const router = useRouter();

  const { emptyOut: emptyOutCart } = useCartStore(({ emptyOut }) => ({
    emptyOut,
  }));

  const {
    order: { id: orderId },
  } = orderInfoProps;

  useEffect(() => {
    if (!watchStatus) return;

    let timeoutId: number | undefined;

    async function updateOrderStatus() {
      await trpcClient.orders.getOrder
        .query({
          orderId,

          pick: ['isPaid'],
        })
        .then(async ({ isPaid }) => {
          if (isPaid) router.refresh();
        })
        .catch((err) => {
          console.error({ err });
        });

      timeoutId = setTimeout(updateOrderStatus, 5e3) as unknown as number;
    }

    timeoutId = setTimeout(updateOrderStatus, 5e3) as unknown as number;

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [watchStatus, router, orderId]);

  useEffect(() => {
    if (shouldEmptyOutCartCartOnMount) emptyOutCart();
  }, [shouldEmptyOutCartCartOnMount, emptyOutCart]);

  return <OrderInfo {...orderInfoProps} />;
};
