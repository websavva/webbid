import { AuthFormFrame } from '@/components/AuthFormFrame';
import { LoginForm } from '@/components/ui/auth/LoginForm';

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
