import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import {} from 'next/headers';

import type { AppRouter } from '@/server/trpc/types';

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_SERVER_URL! + '/api/trpc',
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});
