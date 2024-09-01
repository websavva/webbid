'use client';

import { UserAvatar } from '@/components/UI/UserAvatar';
import { useAuth } from '@/hooks/use-auth';
import { formatDate } from '@/lib/formatters/date';
import { ChangePasswordForm } from '@/components/ChangePasswordForm';

export default function ProfileClientPage() {
  const { email, createdAt, updatedAt } = useAuth().user!;

  return (
    <div className='mx-auto flex w-11/12 max-w-3xl justify-center py-16 md:w-full'>
      <div className='flex flex-col items-center max-md:hidden'>
        <UserAvatar email={email} className='size-36 text-6xl' />
      </div>

      <div className='flex-1 md:ml-32'>
        <div>
          <div className='mb-2 text-xl font-bold text-gray-700'>Email:</div>

          <div className='text-lg' data-testid='email'>
            {email}
          </div>
        </div>

        <hr className='my-8 h-[2px] bg-gray-200' />

        <div>
          <div className='mb-2 text-xl font-bold text-gray-700'>
            Sign Up Date:
          </div>

          <div className='text-lg'>{formatDate(createdAt)}</div>
        </div>

        <hr className='my-8 h-[2px] bg-gray-200' />

        <div>
          <div className='mb-2 text-xl font-bold text-gray-700'>
            Last Update Date:
          </div>

          <div className='text-lg'>{formatDate(updatedAt)}</div>
        </div>

        <hr className='my-8 h-[2px] bg-gray-200' />

        <div>
          <div className='mb-8 text-xl font-bold text-gray-700'>
            Password Update:
          </div>

          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
