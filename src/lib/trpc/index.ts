import { createTRPCProxyClient, httpLink } from '@trpc/client';

import type { AppRouter } from '#server/trpc/types';

import { toAbsoluteUrl } from '../utils/toAbsoluteUrl';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: toAbsoluteUrl('/api/trpc'),

      headers({
        op: {
          context: { headers = {} },
        },
      }) {
        return headers as Record<string, string[] | string>;
      },

      fetch(url, options) {
        return fetch(url, {
          ...options,
          cache: 'no-cache',
          credentials: 'include',
        });
      },
    }),
  ],
});
