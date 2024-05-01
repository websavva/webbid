import { router } from './helpers';

import { authRouter, productsRouter, ordersRouter } from './routers';

export const appRouter = router({
  auth: authRouter,
  products: productsRouter,
  orders: ordersRouter,
});
