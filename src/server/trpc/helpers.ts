import { initTRPC, TRPCError } from '@trpc/server';

import type { Context } from './types';

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;

export const publicProcedure = t.procedure;

export const privateProcedure = publicProcedure.use(
  ({ ctx: { req }, next }) => {
    if (!req.user)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });

    return next({
      ctx: {
        user: req.user,
      },
    });
  },
);
