import type { Metadata } from 'next';

import { AuthFormFrame } from '@/components/AuthFormFrame';
import { LoginForm } from '@/components/Auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In',
};

export const middlewares = ['guest'];

export default function SignUpPage() {
  return (
    <AuthFormFrame
      heading='Sign In'
      linkText='Forgot Password ? Click to reset'
      linkHref='/password-reset'
    >
      <LoginForm />
    </AuthFormFrame>
  );
}
