import { router, publicProcedure } from './helpers';

import { authRouter } from './routers';

export const appRouter = router({
  auth: authRouter,
});
