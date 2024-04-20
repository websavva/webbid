import { router, publicProcedure } from '#server/trpc/helpers';
import { CMS } from '#server/cms';

import { GetProductsQuerySchema } from '@/server/dtos/products';

import { formatPaginationParams, formatSortParams } from '@/server/utils/query';
import { ProductStatus } from '@/consts/product-status';

export const pipe = <R>(...fns: Array<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => (value) => nextFn(prevFn(value)));

export const productsRouter = router({
  getProducts: publicProcedure
    .input(
      GetProductsQuerySchema.transform(formatPaginationParams).transform(
        formatSortParams
      )
    )
    .query(({ input: query }) => {
      const { page, limit, category, sort } = query;

      return CMS.client.find({
        collection: 'products',
        where: {
          category: {
            equals: category,
          },

          approvedForSale: {
            equals: ProductStatus.Approved,
          },
        },
        page,
        limit,
        sort,
      });
    }),
});
