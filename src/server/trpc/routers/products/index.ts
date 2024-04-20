import { router, publicProcedure } from '#server/trpc/helpers';
import { CMS } from '#server/cms';

import { GetProductsQuerySchema } from '@/server/dtos/products';

import {
  formatPaginationParams,
  formatSortParams,
  toWhereEquals,
} from '@/server/utils/query';
import { ProductStatus } from '@/consts/product-status';

export const pipe = <R>(...fns: Array<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => (value) => nextFn(prevFn(value)));

export const productsRouter = router({
  getProducts: publicProcedure
    .input(
      GetProductsQuerySchema.transform(formatPaginationParams)
        .transform(formatSortParams)
        .default({})
    )
    .query(({ input: query }) => {
      const { page, limit, sort, ...whereParams } = query;

      const where = {
        ...toWhereEquals(whereParams),

        approvedForSale: {
          equals: ProductStatus.Approved,
        },
      };

      return CMS.client.find({
        collection: 'products',
        where,
        page,
        limit,
        sort,
        depth: 1,
      });
    }),
});
