import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { defu } from 'defu';

import type { AppRouter } from '@/server/trpc/types';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_SERVER_URL! + '/api/trpc',

      headers({ opList: operations }) {
        let aggregatedHeaders: Record<string, string[] | string> = {};

        for (const {
          context: { headers = {} },
        } of operations) {
          aggregatedHeaders = defu(aggregatedHeaders, headers as any);
        }

        return aggregatedHeaders;
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

trpcClient.auth.login.mutate({}, {});
