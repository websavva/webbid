'use client';

import { UserAvatar } from '@/components/UI/UserAvatar';
import { useAuth } from '@/hooks/use-auth';
import { formatDate } from '@/lib/formatters/date';
import { ChangePasswordForm } from '@/components/ChangePasswordForm';


export default function ProfileClientPage() {
  const { email, createdAt, updatedAt } = useAuth().user!;

  return (
    <div className='flex justify-center mx-auto w-11/12 md:w-full py-16 max-w-3xl'>
      <div className='flex flex-col max-md:hidden items-center'>
        <UserAvatar email={email} className='size-36 text-6xl' />
      </div>

      <div className='md:ml-32 flex-1'>
        <div>
          <div className='text-xl mb-2 text-gray-700 font-bold'>Email:</div>

          <div className='text-lg'>{email}</div>
        </div>

        <hr className='my-8 h-[2px] bg-gray-200' />

        <div>
          <div className='text-xl mb-2 text-gray-700 font-bold'>
            Sign Up Date:
          </div>

          <div className='text-lg'>{formatDate(createdAt)}</div>
        </div>

        <hr className='my-8 h-[2px] bg-gray-200' />

        <div>
          <div className='text-xl mb-2 text-gray-700 font-bold'>
            Last Update Date:
          </div>

          <div className='text-lg'>{formatDate(updatedAt)}</div>
        </div>

        <hr className='my-8 h-[2px] bg-gray-200' />

        <div>
          <div className='text-xl mb-8 text-gray-700 font-bold'>
            Password Update:
          </div>

          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
