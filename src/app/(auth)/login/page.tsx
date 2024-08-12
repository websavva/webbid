import { AuthFormFrame } from '@/components/AuthFormFrame';
import { LoginForm } from '@/components/Auth/LoginForm';
import { guest } from '@/guards/guest';
import { applyGuards } from '@/lib/utils/guards';

export default async function SignUpPage() {
  await applyGuards(guest);

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
