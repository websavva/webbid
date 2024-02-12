import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';

import { Logo } from '@/components/ui/Logo';
import { LoginForm } from '@/components/ui/auth/LoginForm';

export default function SignUpPage() {
  return (
    <div className='flex flex-col items-center pt-16'>
      <div className='flex flex-col items-center'>
        <Logo className='w-28' />

        <h1 className='mt-10 font-semibold text-4xl'>Log In</h1>

        <Link
          href='/sign-up'
          className='text-lg mt-3 text-blue-500 flex items-center hover:underline'
        >
          <span>Don&lsquo;t have an account? Sign up</span>

          <ArrowUpRightIcon className='ml-1 w-[1em]' />
        </Link>
      </div>

      <LoginForm className='mt-7 w-[500px]' />
    </div>
  );
}
