import { notFound } from 'next/navigation';

import type { PagePropsWithParams } from '@/types/page-props';

export default function PasswordResetConfirmPage({
  params: { token },
}: PagePropsWithParams<{ token: string }>) {
  if (token) notFound();


}
