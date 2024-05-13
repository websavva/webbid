import { AuthFormFrame } from '@/components/AuthFormFrame';
import { LoginForm } from '@/components/ui/auth/LoginForm';

export default function SignUpPage() {
  return (
    <AuthFormFrame
      heading='Sign In'
      linkText="Don't have an account ? Sign up"
      linkHref='/sign-up'
    >
      <LoginForm />
    </AuthFormFrame>
  );
}
