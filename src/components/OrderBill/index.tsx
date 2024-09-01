import type { Product } from '#server/cms/collections/types';
import { formatPrice } from '@/lib/formatters';

import { cn } from '@/lib/utils/cn';
import { calculatOrderSum } from '@/lib/utils/finance/calculate-order-sum';
import type { DefineProps } from '@/types';

export type OrderBillProps = DefineProps<{
  products: Product[];
}>;

export const OrderBill = ({
  products,
  className,
  ...attrs
}: OrderBillProps) => {
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
    <div {...attrs} className={cn('rounded-xl bg-gray-100 p-5', className)}>
      <div className='mb-6 font-bold'>Order Summary</div>

      {billSections.map((billSectionItems, index, { length }) => {
        const isLast = length - 1 === index;

        return (
          <div
            key={index}
            className={cn({
              'mb-3 space-y-3 border-b-2 border-b-gray-300 pb-3': !isLast,
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
