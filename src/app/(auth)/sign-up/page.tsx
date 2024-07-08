import { AuthFormFrame } from '@/components/AuthFormFrame';
import { SignUpForm } from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <AuthFormFrame
      heading='Create an account'
      linkHref='/login'
      linkText='Already have an account? Sign-in'
    >
      <SignUpForm />
    </AuthFormFrame>
  );
}
