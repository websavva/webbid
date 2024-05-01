import Stripe from 'stripe';

import { ctx } from '../context';

export const stripeApi = new Stripe(ctx.env.STRIPE.API_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
});
