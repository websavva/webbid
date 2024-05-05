import type { Product } from '#server/cms/collections/types';
import { formatPrice } from '@/lib/formatters';

import { cn } from '@/lib/utils/cn';
import { calculatOrderSum } from '@/lib/utils/finance/calculate-order-sum';
import { DefineProps } from '@/types';

export type OrderBillProps = DefineProps<{
  products: Product[];
}>;

export const OrderBill = ({ products, className, ...attrs }: OrderBillProps) => {
  const { subTotalPrice, fee, totalPrice } = calculatOrderSum(products);

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
    <div {...attrs} className={cn('p-5 rounded-xl bg-gray-100', className)}>
      <div className='font-bold mb-6'>Order Summary</div>

      {billSections.map((billSectionItems, index, { length }) => {
        const isLast = length - 1 === index;

        return (
          <div
            key={index}
            className={cn({
              'border-b-gray-300 border-b-2 pb-3 mb-3 space-y-3': !isLast,
            })}
          >
            {billSectionItems.map(({ title, sum, isHighlighted }) => {
              return (
                <div
                  key={title}
                  className={cn('flex justify-between', {
                    'font-bold': isHighlighted,
                  })}
                >
                  <span>{title}</span>

                  <span>{sum ? formatPrice(sum) : 'Free'}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
