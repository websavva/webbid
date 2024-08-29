import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import type { PagePropsWithParams } from '@/types/page-props';
import { ConfirmPasswordResetForm } from '@/components/Auth/ConfirmPasswordResetForm';

export const metadata: Metadata = {
  title: 'Password Reset Confirmation',
};

export const middlewares = ['guest'];

export default function PasswordResetConfirmPage({
  params: { token },
}: PagePropsWithParams<{ token: string }>) {
  if (!token) notFound();

  return (
    <ConfirmPasswordResetForm token={token} className='max-w-lg pt-5 w-full' />
  );
}
