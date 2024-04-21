import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres';

import initialProductCategories from './data/initial-product-categories.json';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
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

      console.log({
        categoryId
      });


      await Promise.all(
        features.map(({ name, externalImageUrl, href }) => {
          return payload.create({
            // @ts-ignore
            req,
            collection: 'productCategoryFeatures',
            data: {
              category: categoryId,
              name,
              href,
              externalImageUrl,
            },
          });
        })
      );
    })
  );
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await Promise.all(
    initialProductCategories.map(async ({ id: name, features }) => {
      const featuresNames = features.map(({ name }) => name);

      await payload.db.deleteMany({
        // @ts-ignore
        req,
        collection: 'productCategoryFeatures',
        where: {
          name: {
            in: featuresNames,
          },
        },
      });

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
    })
  );
}
