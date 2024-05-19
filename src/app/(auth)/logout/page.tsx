import { applyGuards } from '@/lib/utils/guards';
import { auth } from '@/guards/auth';

import LogoutClientPage from './page_client';

export default async function LogoutPage() {
  await applyGuards(auth);

  return <LogoutClientPage />;
}
