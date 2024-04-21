import { createTRPCProxyClient, httpLink } from '@trpc/client';

import type { AppRouter } from '#server/trpc/types';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: process.env.NEXT_PUBLIC_SERVER_URL! + '/api/trpc',

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
          credentials: 'include',
        });
      },
    }),
  ],
});
