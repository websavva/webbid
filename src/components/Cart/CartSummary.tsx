import type { Product } from '#server/cms/collections/types';
import { formatPrice } from '@/lib/formatters';

import { cn } from '@/lib/utils/cn';
import { calculatOrderSum } from '@/lib/utils/finance/calculate-order-sum';
import { DefineProps } from '@/types';
import { Separator } from '@radix-ui/react-dropdown-menu';

export type CartSummaryProps = DefineProps<{
  items: Product[];
}>;

export const CartSummary = ({
  items,
  className,
  ...attrs
}: CartSummaryProps) => {
  const { subTotalPrice, fee, totalPrice } = calculatOrderSum(items);

  const billSections: Array<
    Array<{
      title: string;
      sum: number;
      isHighlighted?: boolean;
    }>
  > = [
    [
      {
        title: 'Sub Total',
        sum: subTotalPrice,
      },
    ],

    [
      {
        title: 'Shipping',
        sum: 0,
      },

      {
        title: 'Flat Transaction Fee',
        sum: fee,
      },
    ],

    [
      {
        title: 'Total',
        sum: totalPrice,
        isHighlighted: true,
      },
    ],
  ];

  return (
    <div {...attrs} className={cn('', className)}>
      <div>Order Summary</div>

      {billSections.map((billSectionItems, index) => {
        return (
          <div key={index}>
            {billSectionItems.map(({ title, sum, isHighlighted }) => {
              return (
                <div key={title}>
                  <span>{title}</span>

                  <span>{sum ? formatPrice(sum) : 'Free'}</span>
                </div>
              );
            })}

            <Separator />
          </div>
        );
      })}
    </div>
  );
};
