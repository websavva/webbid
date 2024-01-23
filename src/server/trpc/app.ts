import { router, publicProcedure } from './helpers';

export const appRouter = router({
  getMessage: publicProcedure.query(() => {
    return {
      message: 'Hello World from tRPC !',
    };
  }),
});
