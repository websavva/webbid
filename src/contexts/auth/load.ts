import { trpcClient } from '@/lib/trpc';
import { TRPCClientError } from '@trpc/client';

export const loadAuthContext = (headers?: Headers | Record<string, any>) => {
  return trpcClient.auth.getMe
    .query(undefined, {
      context: {
        headers,
      },
    })
    .catch((err) => {
      if (err instanceof TRPCClientError && err.data.code === 'UNAUTHORIZED') {
        return {
          user: null,
        };
      }

      throw err;
    });
};
