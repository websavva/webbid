import { rm } from 'fs-extra';
import { join } from 'path';

import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres';

import type {
  Media,
  Product,
  ProductCategoryFeature,
  ProductFile,
} from '../cms/collections/types';

import initialProductCategories from './data/initial-seed/product-categories/product-categories.json';
import initialProducts from './data/initial-seed/products/products.json';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // creating super admin
  const adminUser = await payload.create({
    collection: 'users',

    // @ts-ignore
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
        // @ts-ignore
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
            // @ts-ignore
            req,
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
            // @ts-expect-error
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
        // @ts-expect-error
        req,
      });

      const categoryId = categories.find(
        ({ name }) => name === product.category,
      )!.id;

      await payload.create({
        collection: 'products',
        // @ts-expect-error virtual fields should be ignored
        data: {
          user: adminUser.id as number,
          name: product.name,
          description: product.description,
          category: categoryId as number,
          approvedForSale: product.approvedForSale as any,
          images: productImages.map(({ id }) => ({ image: +id })),
          productFile: productFile.id as number,
          price: product.price,
        },
        // @ts-expect-error
        req,
      });
    }),
  );
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  const filePathsToBeDeleted: string[] = [];

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

        // @ts-expect-error
        req,
      });

      const productFileId = product!.productFile as number;

      const imageIds = product!.images.map(({ image }) => image as number);

      await payload.db.deleteOne({
        collection: 'products',
        where: {
          id: {
            equals: product!.id,
          },
        },

        // @ts-expect-error
        req,
      });

      const productFile = await payload.db.findOne<ProductFile>({
        collection: 'productFiles',
        where: {
          id: {
            equals: productFileId,
          },
        },

        // @ts-expect-error
        req,
      });

      const productFileFullPath = join(
        payload.collections.productFiles.config.upload.staticDir,
        productFile!.filename!,
      );

      filePathsToBeDeleted.push(productFileFullPath);

      await payload.db.deleteOne({
        collection: 'productFiles',
        where: {
          id: {
            equals: productFileId,
          },
        },

        // @ts-expect-error
        req,
      });

      const { docs: productImages } = await payload.db.find<Media>({
        collection: 'media',
        where: {
          id: {
            in: imageIds,
          },
        },

        // @ts-expect-error
        req,
      });

      productImages.forEach(({ filename, sizes }) => {
        const imageFileNames: string[] = [];

        imageFileNames.push(filename!);

        if (sizes)
          Object.values(sizes).forEach(({ filename }) =>
            imageFileNames.push(filename!),
          );

        imageFileNames.forEach((imageFileName) => {
          const imageFullPath = join(
            payload.collections.media.config.upload.staticDir,
            imageFileName,
          );

          filePathsToBeDeleted.push(imageFullPath);
        });
      });

      await payload.db.deleteMany({
        collection: 'media',
        where: {
          id: {
            in: imageIds,
          },
        },

        // @ts-expect-error
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

            allImageFileNames.forEach((fileName) => {
              const fileFullPath = join(
                payload.collections.media.config.upload.staticDir,
                fileName,
              );

              filePathsToBeDeleted.push(fileFullPath);
            });

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

  await Promise.all(
    filePathsToBeDeleted.map((fullFilePath) => rm(fullFilePath)),
  );
}
