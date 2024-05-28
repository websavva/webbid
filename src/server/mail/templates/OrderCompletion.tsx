import type { Order, Product } from '#server/cms/collections/types';

import { calculatOrderSum } from '@/lib/utils/finance/calculate-order-sum';
import { toAbsoluteUrl } from '@/lib/utils/toAbsoluteUrl';
import { formatDate } from '@/lib/formatters/date';
import { formatPrice } from '@/lib/formatters';

import { defineEmailTemplate } from './utils';
import { Layout } from './components/Layout';
import { Heading } from './components/Heading';
import { Section } from '@react-email/components';
import { Text } from './components/Text';
import { Button } from './components/Button';
import { Hr } from './components/Hr';
import { publicEnv } from '@/server/env/public';

export interface OrderCompletionTemplateProps {
  order: Order;
}

export const OrderCompletionTemplate = defineEmailTemplate(
  ({ order }: OrderCompletionTemplateProps) => {
    const {
      id,

      products: _products,
      createdAt,
    } = order;

    const products = _products as Product[];

    const { subTotalPrice, totalPrice, fee } = calculatOrderSum(products);

    const orderUrl = toAbsoluteUrl('orders', String(id));

    return (
      <Layout previewText='Order Complete'>
        <Section
          style={{
            padding: '20px',
          }}
        >
          <Heading>Order Completion </Heading>

          <Text
            style={{
              margin: '24px 0 16px',
            }}
          >
            Your order has been processed successfully. In order to access
            products, you can browse to the following link:
          </Text>

          <Button
            href={orderUrl}
            style={{
              width: 100,
            }}
          >
            More
          </Button>

          <Text
            style={{
              margin: '20px 0 16px',
            }}
          >
            Alternatively, you can copy and paste into search bar the given
            link:
            <br />
            <span
              style={{
                color: '#2754C5',
              }}
            >
              {orderUrl}
            </span>
          </Text>

          <Hr />

          <Heading
            as='h2'
            style={{
              fontSize: 17,
              fontWeight: 600,
              marginTop: 25,
            }}
          >
            Details
          </Heading>

          <Section>
            {[
              ['ID', `#${id}`],
              ['Created At', formatDate(createdAt)],
            ].map(([name, value]) => {
              return (
                <Text
                  key={name}
                  style={{
                    margin: '5px 0',
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      marginRight: 5,
                      color: '#767676',
                    }}
                  >
                    {name}:
                  </span>

                  <span>{value}</span>
                </Text>
              );
            })}

            <Text
              style={{
                margin: '30px 0 10px',
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: 10,
                borderBottom: '1px solid #b7b7b7',
                fontWeight: 600,
              }}
            >
              <span>Product Name</span>

              <span>Price</span>
            </Text>

            {products.map(({ id, name, price }) => {
              return (
                <Text
                  key={id}
                  style={{
                    margin: '10px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{name}</span>

                  <span>{formatPrice(price)}</span>
                </Text>
              );
            })}
          </Section>

          <Text
            style={{
              margin: 0,
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 10,
              borderTop: '1px solid #b7b7b7',
              fontWeight: 600,
            }}
          >
            <span>Service Fee ({publicEnv.SERVICE_FEE_PERCENTAGE}%)</span>

            <span>{formatPrice(fee)}</span>
          </Text>

          <Text
            style={{
              margin: '10px 0',
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 600,
            }}
          >
            <span>Total Price</span>

            <span>{formatPrice(totalPrice)}</span>
          </Text>
        </Section>
      </Layout>
    );
  },
  {
    order: {
      createdAt: new Date().toISOString(),
      id: 230,
      products: [
        {
          id: 1,
          name: 'Test Icons',
          price: 525.25,
        },
        {
          id: 2,
          name: 'Brand New UI Kit',
          price: 10_999,
        },
      ],
    } as Order,
  }
);
