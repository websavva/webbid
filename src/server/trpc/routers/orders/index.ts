import { z } from 'zod';
import type Stripe from 'stripe';
import flatry from 'await-to-js';

import { CMS } from '#server/cms';

import { ProductStatus } from '@/consts/product-status';

import { privateProcedure, router } from '../../helpers';
import { stripeApi } from '@/server/stripe/api';
import { ctx } from '@/server/context';
import { TRPCError } from '@trpc/server';
import { calculatOrderSum } from '@/lib/utils/finance/calculate-order-sum';
import { Order } from '@/server/cms/collections/types';

const cancelSessionStripeUrl = `${ctx.env.BASE_URL}/cart`;

export const ordersRouter = router({
  createOrder: privateProcedure
    .input(
      z.array(z.number()).nonempty({
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
            name: `Service fee (${ctx.env.STRIPE.SERVICE_FEE_PERCENTAGE}%)`,
          },
          currency: 'USD',
          unit_amount: Math.round(fee * 100),
        },
      });

      const order = await CMS.client.create({
        collection: 'orders',
        data: {
          _isPaid: false,
          user: user.id,
          products: productsToBeBought.map(({ id }) => id),
        },

        req,
      });

      const successUrl = `${ctx.env.BASE_URL}/thank-you?orderId=${order.id}`;

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

        if (pick?.length) return order;

        return Object.fromEntries(
          pick.map((fieldName) => [fieldName, order[fieldName]])
        );
      }
    ),
});
