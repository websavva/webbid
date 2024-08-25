import type { Metadata } from 'next';

import { applyGuards } from '@/lib/utils/guards';
import { auth } from '@/guards/auth';

import LogoutClientPage from './page_client';

export const metadata: Metadata = {
  title: 'Log Out',
};

export default async function LogoutPage() {
  await applyGuards(auth);

  return <LogoutClientPage />;
}
