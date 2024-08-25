import type { Metadata } from 'next';

import { applyGuards } from '@/lib/utils/guards';
import { guest } from '@/guards/guest';

import { RequestPasswordResetForm } from '@/components/Auth/RequestPasswordResetForm';

export const metadata: Metadata = {
  title: 'Password Reset',
};

export default async function PasswordResetPage() {
  await applyGuards(guest);

  return <RequestPasswordResetForm />;
}
