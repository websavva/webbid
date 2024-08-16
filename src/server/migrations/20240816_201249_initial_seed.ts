import { readFile } from 'fs-extra';
import { join } from 'path';

import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres';

import type { Media, ProductCategoryFeature } from '../cms/collections/types';

import initialProductCategories from './data/initial_seed/product-categories/product-categories.json';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const adminUser = await payload.create({
    collection: 'users',

    data: {
      email: process.env.PAYLOAD_ADMIN_EMAIL!,
      password: process.env.PAYLOAD_ADMIN_PASSWORD!,
      role: 'admin',
      _verified: true,
    },
  });

  await Promise.all(
    initialProductCategories.map(async ({ id: name, label, features }) => {
      const { id: categoryId } = await payload.create({
        // @ts-ignore
        req,
        collection: 'productCategories',
        data: {
          name,
          label,
        },
      });

      await Promise.all(
        features.map(async ({ name, image: imageRelativePath, href }) => {
          const productCategoryFeatureImage = await payload.create({
            collection: 'media',
            data: {
              user: adminUser.id as number,
            },
            filePath: join(
              __dirname,
              './data/initial_seed/product-categories/images',
              imageRelativePath,
            ),
          });

          await payload.create({
            // @ts-ignore
            req,
            collection: 'productCategoryFeatures',
            data: {
              // @ts-ignore
              category: categoryId,
              name,
              href,
              image: productCategoryFeatureImage.id as number,
            },
          });
        }),
      );
    }),
  );
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await Promise.all(
    initialProductCategories.map(async ({ id: name, features }) => {
      await Promise.all(
        features.map(async ({ name }) => {
          const productCategoryFeature =
            await payload.db.findOne<ProductCategoryFeature>({
              collection: 'productCategoryFeatures',
              where: {
                name: {
                  equals: name,
                },
              },
              // @ts-expect-error
              req,
            });

          await payload.delete({
            collection: 'media',

            where: {
              id: {
                equals: (productCategoryFeature!.image as Media).id,
              },
            },
          });

          await payload.delete({
            // @ts-ignore
            req,
            collection: 'productCategoryFeatures',
            where: {
              name: {
                equals: productCategoryFeature!.name,
              },
            },
          });
        }),
      );

      await payload.delete({
        // @ts-ignore
        req,
        collection: 'productCategories',
        where: {
          name: {
            equals: name,
          },
        },
      });
    }),
  );

  await payload.delete({
    collection: 'users',

    where: {
      email: {
        equals: process.env.PAYLOAD_ADMIN_EMAIL!
      }
    },

    // @ts-expect-error
    req,
  });
}
