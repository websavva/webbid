import type { PayloadRequest } from 'payload/types';

import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

import type { User } from '#server/cms/collections/types';

// created for each request
export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    req: req as PayloadRequest<User>,
    res,
  };
};
