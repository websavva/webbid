import { join } from 'path';

import type {
  Media,
  Product,
  ProductCategoryFeature,
} from '../cms/collections/types';

import type { MigrateUpArgs, MigrateDownArgs } from './types';
import initialProductCategories from './data/initial-seed/product-categories/product-categories.json';
import initialProducts from './data/initial-seed/products/products.json';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // creating super admin
  const adminUser = await payload.create({
    collection: 'users',

    req,

    data: {
      email: process.env.PAYLOAD_ADMIN_EMAIL!,
      password: process.env.PAYLOAD_ADMIN_PASSWORD!,
      role: 'admin',
      _verified: true,
    },
  });

  // creating main product categories with features and their files
  const categories = await Promise.all(
    initialProductCategories.map(async ({ id: name, label, features }) => {
      const category = await payload.create({
        req,
        collection: 'productCategories',
        data: {
          name,
          label,
        },
      });

      const { id: categoryId } = category;

      await Promise.all(
        features.map(async ({ name, image: imageRelativePath, href }) => {
          const productCategoryFeatureImage = await payload.create({
            collection: 'media',
            data: {
              user: adminUser.id as number,
            },
            filePath: join(
              __dirname,
              './data/initial-seed/product-categories/images',
              imageRelativePath,
            ),

            req,
          });

          await payload.create({
            req,
            collection: 'productCategoryFeatures',
            data: {
              category: categoryId,
              name,
              href,
              image: productCategoryFeatureImage.id as number,
            },
          });
        }),
      );

      return category;
    }),
  );

  // creating products
  await Promise.all(
    initialProducts.map(async (product) => {
      // creating product images
      const productImages = await Promise.all(
        [...Array(3).keys()].map((imageIndex) => {
          return payload.create({
            collection: 'media',
            data: {
              user: adminUser.id as number,
            },
            filePath: join(
              __dirname,
              `./data/initial-seed/products/images/product-${product.id}_${imageIndex + 1}.jpg`,
            ),
            req,
          });
        }),
      );

      // creating product file
      const productFile = await payload.create({
        collection: 'productFiles',
        data: {
          user: adminUser.id as number,
        },
        filePath: join(
          __dirname,
          `./data/initial-seed/products/files/product-file-${product.id}.txt`,
        ),

        req,
      });

      const categoryId = categories.find(
        ({ name }) => name === product.category,
      )!.id;

      await payload.create({
        collection: 'products',
        data: {
          user: adminUser.id as number,
          name: product.name,
          description: product.description,
          category: categoryId as number,
          // @ts-expect-error
          approvedForSale: product.approvedForSale,
          images: productImages.map(({ id }) => ({ image: +id })),
          productFile: productFile.id as number,
          price: product.price,
        },

        req,
      });
    }),
  );
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // deletion of products
  await Promise.all(
    initialProducts.map(async (initialProduct) => {
      const product = await payload.db.findOne<Product>({
        collection: 'products',
        where: {
          name: {
            equals: initialProduct.name,
          },
          description: {
            equals: initialProduct.description,
          },
          'category.name': {
            equals: initialProduct.category,
          },
        },

        req,
      });

      const productFileId = product!.productFile as number;

      const imageIds = product!.images.map(({ image }) => image as number);

      await payload.delete({
        collection: 'products',
        where: {
          id: {
            equals: product!.id,
          },
        },

        req,
      });

      await payload.delete({
        collection: 'productFiles',
        where: {
          id: {
            equals: productFileId,
          },
        },

        req,
      });

      await payload.delete({
        collection: 'media',
        where: {
          id: {
            in: imageIds,
          },
        },

        req,
      });
    }),
  );

  // deletion of product categories and their features
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

          req,
        });

      await Promise.all(
        productCategoryFeatures.map(
          async ({ id: featureId, image: imageId }) => {
            const image = (await payload.findByID({
              collection: 'media',
              id: imageId as number,
            })) as unknown as Media;

            await payload.delete({
              collection: 'media',

              where: {
                id: {
                  equals: image.id,
                },
              },

              req,
            });

            await payload.delete({
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

    req,
  });
}
