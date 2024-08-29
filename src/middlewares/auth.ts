import { NextResponse } from 'next/server';

import { requestHeaders } from '@/lib/utils/request-headers';
import { trpcClient } from '@/lib/trpc';
import { defineMiddleware } from '@/modules/middleware-aggregator/runtime/utils';

const authMiddleware = defineMiddleware(async (req) => {
  const { user } = await trpcClient.auth.getMe
    .query(undefined, {
      context: {
        headers: requestHeaders(req.headers),
      },
    })
    .catch(() => ({ user: null }));

  if (!user) {
    const loginUrl = new URL('/login', req.url);

    return NextResponse.redirect(loginUrl);
  }
});

export default authMiddleware;
