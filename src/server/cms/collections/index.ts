export * from './users';
export * from './media';
export * from './products';
export * from './orders';
export * from './product-files';
export * from './product-categories';
export * from './product-category-features';

import { Users } from './users';
import { Media } from './media';
import { Products } from './products';
import { Orders } from './orders';
import { ProductFiles } from './product-files';
import { ProductCategories } from './product-categories';
import { ProductCategoryFeatures } from './product-category-features';

export const collections = [
  Users,
  Media,
  Products,
  Orders,
  ProductFiles,
  ProductCategoryFeatures,
  ProductCategories,
];
