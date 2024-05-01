import { GetProductCategoriesQuerySchema } from '#server/dtos/products/categories';
import { router, publicProcedure } from '../../helpers';
import { formatPaginationParams, formatSortParams } from '#server/utils/query';
import { CMS } from '#server/cms';
import { GetProductCategoryFeaturesSchema } from '#server/dtos/products/categories/features';

export const productCategoriesRouter = router({
  getCategories: publicProcedure
    .input(
      GetProductCategoriesQuerySchema.transform(
        formatPaginationParams
      ).transform(formatSortParams)
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
      }
    ),
});
