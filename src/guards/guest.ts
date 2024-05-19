'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { defineGuard } from '@/lib/utils/guards';

export const guest = defineGuard(() => {
  if (cookies().has('digital-marketplace-token')) {
    redirect('/profile');
  }

  return true;
});
