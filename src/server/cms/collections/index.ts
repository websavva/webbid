export * from './user';
export * from './media';
export * from './product';

import { User } from './user';
import { Media } from './media';
import { Product } from './product';

export const collections = [User, Media, Product];
