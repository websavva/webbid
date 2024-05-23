import Stripe from 'stripe';

import { privateEnv } from '../env/private';

export const stripeApi = new Stripe(privateEnv.STRIPE.API_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
});
