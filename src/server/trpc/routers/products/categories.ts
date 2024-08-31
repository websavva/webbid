import { z } from 'zod';

import { TRPCError } from '@trpc/server';

import { GetProductCategoriesQuerySchema } from '#server/dtos/products/categories';

import { formatPaginationParams, formatSortParams } from '#server/utils/query';
import { CMS } from '#server/cms';
import { GetProductCategoryFeaturesSchema } from '#server/dtos/products/categories/features';

import { router, publicProcedure } from '../../helpers';

export const productCategoriesRouter = router({
  getCategories: publicProcedure
    .input(
      GetProductCategoriesQuerySchema.transform(formatPaginationParams)
        .transform(formatSortParams)
        .default({}),
    )
    .query(({ input: { limit, pagination, page, sort }, ctx: { req } }) => {
      return CMS.client.find({
        collection: 'productCategories',
        depth: 2,
        limit,
        page,
        pagination,
        sort,

        req,
      });
    }),

  getCategoryFeatures: publicProcedure
    .input(GetProductCategoryFeaturesSchema.transform(formatPaginationParams))
    .query(
      async ({ input: { categoryId, ...paginationParams }, ctx: { req } }) => {
        return CMS.client.find({
          collection: 'productCategoryFeatures',

          where: {
            category: {
              equals: categoryId,
            },
          },

          sort: '-createdAt',

          ...paginationParams,

          req,
        });
      },
    ),

  getCategoryByName: publicProcedure
    .input(z.string())
    .query(async ({ input: categoryName }) => {
      const {
        docs: { 0: category = null },
      } = await CMS.client.find({
        collection: 'productCategories',
        where: {
          name: {
            equals: categoryName,
          },
        },
      });

      if (!category)
        throw new TRPCError({
          code: 'NOT_FOUND',
        });

      return category;
    }),
});
