import { rm } from 'fs-extra';
import { join } from 'path';

import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres';

import type {
  Media,
  ProductCategory,
  ProductCategoryFeature,
} from '../cms/collections/types';

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
    initialProductCategories.map(async ({ id: name }) => {
      const { docs: productCategoryFeatures } =
        await payload.db.find<ProductCategoryFeature>({
          collection: 'productCategoryFeatures',
          where: {
            'category.name': {
              equals: name,
            },
          },

          // @ts-expect-error
          req,
        });

      await Promise.all(
        productCategoryFeatures.map(
          async ({ id: featureId, image: imageId }) => {
            const image = (await payload.findByID({
              collection: 'media',
              id: imageId as number,
            })) as unknown as Media;

            const allImageFileNames: string[] = [image.filename!];

            if (image.sizes) {
              const resizedImageFileNames = Object.values(image.sizes!).map(
                ({ filename }) => filename!,
              );

              allImageFileNames.push(...resizedImageFileNames);
            }

            await Promise.all(
              allImageFileNames.map((fileName) => {
                const fileFullPath = join(
                  payload.collections.media.config.upload.staticDir,
                  fileName,
                );

                return rm(fileFullPath);
              }),
            );

            await payload.db.deleteOne({
              collection: 'media',

              where: {
                id: {
                  equals: image.id,
                },
              },

              // @ts-ignore
              req,
            });

            await payload.delete({
              // @ts-ignore
              req,
              collection: 'productCategoryFeatures',
              where: {
                id: {
                  equals: featureId,
                },
              },
            });
          },
        ),
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
        equals: process.env.PAYLOAD_ADMIN_EMAIL!,
      },
    },

    // @ts-expect-error
    req,
  });
}
