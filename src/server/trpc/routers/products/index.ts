import { z } from 'zod';
import type { Where } from 'payload/types';

import { router, publicProcedure } from '#server/trpc/helpers';
import { CMS } from '#server/cms';
import { GetProductsQuerySchema } from '#server/dtos/products';

import {
  formatPaginationParams,
  formatSortParams,
} from '#server/utils/query';
import { ProductStatus } from '@/consts/product-status';

import { productCategoriesRouter } from './categories';

export const productsRouter = router({
  getProducts: publicProcedure
    .input(
      GetProductsQuerySchema.transform(formatPaginationParams)
        .transform(formatSortParams)
        .default({})
    )
    .query(({ input: query }) => {
      const { page, limit, sort, pagination, category } = query;

      const where: Where = {
        approvedForSale: {
          equals: ProductStatus.Approved,
        },
      };

      if (category) {
        where['category.name'] = {
          equals: category,
        };
      }

      return CMS.client.find({
        collection: 'products',
        where,
        page,
        limit,
        sort,
        pagination,
        depth: 1,
      });
    }),

  getProductById: publicProcedure
    .input(z.number())
    .query(async ({ input: productId, ctx: { req } }) => {
      let { docs: [product = null] = [] } = await CMS.client.find({
        collection: 'products',
        where: {
          id: {
            equals: productId,
          },
        },
        depth: 1,
      });

      if (!product) return null;

      const { user: productOwner } = product;

      let isOwner: boolean = false;

      if (req.user && productOwner && typeof productOwner !== 'number') {
        isOwner = req.user.id === productOwner.id;
      }

      // only approved products are allowed to be read by other users
      if (!isOwner && product.approvedForSale !== ProductStatus.Approved)
        return null;

      return product;
    }),

  categories: productCategoriesRouter,
});
