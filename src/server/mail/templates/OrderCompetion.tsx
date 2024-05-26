import type { Order, Product } from '#server/cms/collections/types';

import { calculatOrderSum } from '@/lib/utils/finance/calculate-order-sum';
import { toAbsoluteUrl } from '@/lib/utils/toAbsoluteUrl';
import { formatDate } from '@/lib/formatters/date';
import { formatPrice } from '@/lib/formatters';

import { defineEmailTemplate } from './utils';
import { Layout } from './components/Layout';
import { Heading } from './components/Heading';
import { Section } from '@react-email/components';

export interface OrderCompletionTemplateProps {
  order: Order;
}

export const OrderCompletionTemplate = defineEmailTemplate(
  ({ order }: OrderCompletionTemplateProps) => {
    const {
      id,

      products,
      createdAt,
    } = order;

    const { subTotalPrice, totalPrice, fee } = calculatOrderSum(
      products as Product[]
    );

    return (
      <Layout previewText='Order Complete'>
        <Section>
          <Heading>Your order’s been processed</Heading>
        </Section>
      </Layout>
    );
  },
  {
    order: {} as Order,
  }
);
