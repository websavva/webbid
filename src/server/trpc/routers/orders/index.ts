import { z } from 'zod';
import type Stripe from 'stripe';
import flatry from 'await-to-js';
import { TRPCError } from '@trpc/server';

import { CMS } from '#server/cms';
import { stripeApi } from '#server/stripe/api';
import { Order } from '#server/cms/collections/types';
import { GetOrdersQuerySchema } from '#server/dtos/orders';
import { formatPaginationParams } from '#server/utils/query';

import { privateEnv } from '#server/env/private';
import { publicEnv } from '#server/env/public';
import { calculatOrderSum } from '@/lib/utils/finance/calculate-order-sum';
import { OrderStatus } from '@/consts/order-status';
import { ProductStatus } from '@/consts/product-status';
import { formatPaginationMeta } from '#server/utils/format-pagination-meta';
import { toAbsoluteUrl } from '@/lib/utils/toAbsoluteUrl';

import { privateProcedure, router } from '../../helpers';
import { Where } from 'payload/types';

const cancelSessionStripeUrl = toAbsoluteUrl('/cart');

export const ordersRouter = router({
  createOrder: privateProcedure
    .input(
      z.array(z.number()).min(1, {
        message: 'No products were provided !',
      })
    )
    .mutation(async ({ input: productIds, ctx: { user, req } }) => {
      const { docs: productsToBeBought } = await CMS.client.find({
        collection: 'products',

        where: {
          approvedForSale: {
            equals: ProductStatus.Approved,
          },

          stripeId: {
            exists: true,
          },

          priceId: {
            exists: true,
          },

          id: {
            in: productIds,
          },
        },

        pagination: false,

        req,
      });

      const stripeBillItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        productsToBeBought.map(({ priceId }) => {
          return {
            quantity: 1,
            price: priceId!,
          };
        });

      const { fee } = calculatOrderSum(productsToBeBought);

      // addition of service fee
      stripeBillItems.push({
        quantity: 1,
        price_data: {
          product_data: {
            name: `Service fee (${privateEnv.STRIPE.SERVICE_FEE_PERCENTAGE}%)`,
          },
          currency: 'USD',
          unit_amount: Math.round(fee * 100),
        },
      });

      const order = await CMS.client.create({
        collection: 'orders',
        // @ts-ignore
        data: {
          status: OrderStatus.Processing,
          user: user.id,
          products: productsToBeBought.map(({ id }) => id),
        },

        req,
      });

      const successUrl = toAbsoluteUrl(`thank-you?orderId=${order.id}`);

      const [stripeErr, stripeSession] = await flatry(
        stripeApi.checkout.sessions.create({
          line_items: stripeBillItems,
          success_url: successUrl,
          payment_method_types: ['card', 'paypal'],
          mode: 'payment',
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          expires_at: Math.round(
            Date.now() / 1e3 +
              privateEnv.STRIPE.STRIPE_ORDER_SESSION_VALIDITY_DURATION * 60
          ),
          cancel_url: cancelSessionStripeUrl,
        })
      );

      if (stripeErr || !stripeSession?.url) {
        await CMS.client.delete({
          collection: 'orders',

          where: {
            id: {
              equals: order.id,
            },
          },

          req,
        });

        console.error(stripeErr);

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Order was not created',
        });
      }

      return stripeSession.url;
    }),

  getOrder: privateProcedure
    .input(
      z.object({
        orderId: z.number(),
        pick: z
          .array(z.string())
          .optional()
          .transform((pick) => pick as Array<keyof Order>),
      })
    )
    .query(
      async ({
        input: { orderId, pick },

        ctx: { req },
      }) => {
        const [err, order] = await flatry(
          CMS.client.findByID({
            collection: 'orders',
            id: orderId,
            depth: 2,
            req,
          })
        );

        if (err) throw new TRPCError({ code: 'NOT_FOUND' });

        if (!pick?.length) return order;

        return Object.fromEntries(
          pick.map((fieldName) => [fieldName, order[fieldName]])
        ) as unknown as Order;
      }
    ),

  getOrders: privateProcedure
    .input(GetOrdersQuerySchema.transform(formatPaginationParams))
    .query(
      async ({
        input: {
          pagination,
          limit,
          page,

          status,
        },

        ctx: { user },
      }) => {
        const where: Where = {
          user: {
            equals: user.id,
          },
        };

        if (status) {
          where.status = {
            equals: status,
          };
        }

        const paginatedOrders = await CMS.client.find({
          collection: 'orders',

          where,

          sort: '-createdAt',

          pagination,
          page,
          limit,
        });

        const { docs: orders } = paginatedOrders;

        return {
          orders,

          paginationMeta: formatPaginationMeta(paginatedOrders),
        };
      }
    ),
});
