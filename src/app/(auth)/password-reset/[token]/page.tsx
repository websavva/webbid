import { notFound } from 'next/navigation';

import type { PagePropsWithParams } from '@/types/page-props';
import { ConfirmPasswordResetForm } from '@/components/ui/auth/ConfirmPasswordResetForm';

export default function PasswordResetConfirmPage({
  params: { token },
}: PagePropsWithParams<{ token: string }>) {
  if (!token) notFound();

  return (
    <ConfirmPasswordResetForm token={token} className='max-w-lg pt-5 w-full' />
  );
}
