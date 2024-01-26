import { router, publicProcedure } from './helpers';

import { authRouter } from './routers';

export const appRouter = router({
  getMessage: publicProcedure.query(() => {
    return {
      message: 'Hello World from tRPC !',
    };
  }),

  auth: authRouter,
});
