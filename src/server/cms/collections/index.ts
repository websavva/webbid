export * from './user';
export * from './media';
export * from './product';
export * from './orders';

import { User } from './user';
import { Media } from './media';
import { Product } from './product';
import { Orders } from './orders';

export const collections = [User, Media, Product, Orders];
