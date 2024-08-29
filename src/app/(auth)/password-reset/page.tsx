import type { Metadata } from 'next';

import { RequestPasswordResetForm } from '@/components/Auth/RequestPasswordResetForm';

export const metadata: Metadata = {
  title: 'Password Reset',
};

export const middlewares = ['guest'];

export default function PasswordResetPage() {
  return <RequestPasswordResetForm />;
}
