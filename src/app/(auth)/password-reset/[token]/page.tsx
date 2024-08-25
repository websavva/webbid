import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { applyGuards } from '@/lib/utils/guards';
import { guest } from '@/guards/guest';
import type { PagePropsWithParams } from '@/types/page-props';
import { ConfirmPasswordResetForm } from '@/components/Auth/ConfirmPasswordResetForm';

export const metadata: Metadata = {
  title: 'Password Reset Confirmation',
};

export default async function PasswordResetConfirmPage({
  params: { token },
}: PagePropsWithParams<{ token: string }>) {
  await applyGuards(guest)

  if (!token) notFound();

  return (
    <ConfirmPasswordResetForm token={token} className='max-w-lg pt-5 w-full' />
  );
}
