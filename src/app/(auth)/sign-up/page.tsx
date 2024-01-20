import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react'

import { Logo } from '@/components/ui/Logo';
import { SignUpForm } from '@/components/ui/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className='flex flex-col items-center pt-16'>
      <div className='flex flex-col items-center'>
        <Logo className='w-28' />

        <h1 className='mt-10 font-semibold text-4xl'>
          Create an account
        </h1>

        <Link href='/login' className='text-lg mt-3 text-blue-500 flex items-center hover:underline'>
          <span>
            Already have an account? Sign-in
          </span>

          <ArrowUpRightIcon className='ml-1 w-[1em]'/>
        </Link>
      </div>

      <SignUpForm className='mt-7 w-[500px]' />
    </div>
  );
}
