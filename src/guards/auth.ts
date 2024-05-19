'use server';

import { redirect } from 'next/navigation';

import { requestHeaders } from '@/lib/utils/request-headers';
import { trpcClient } from '@/lib/trpc';
import { defineGuard } from '@/lib/utils/guards';

export const auth = defineGuard(async () => {
  const { user } = await trpcClient.auth.getMe
    .query(undefined, {
      context: {
        headers: requestHeaders(),
      },
    })
    .catch(() => ({ user: null }));

  if (!user) {
    redirect('/login');
  }

  return true;
});
