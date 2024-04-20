import { router } from './helpers';

import { authRouter } from './routers';
import { productsRouter } from './routers/products';

export const appRouter = router({
  auth: authRouter,
  products: productsRouter,
});
