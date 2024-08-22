import { applyGuards } from '@/lib/utils/guards';
import { auth } from '@/guards/auth';

import ProfileClientPage from './page_client';

export default async function ProfilePage() {
  await applyGuards(auth);

  return (
    <div className='mx-auto w-11/12 md:w-full py-16 max-w-3xl'>
      <ProfileClientPage />
    </div>
  );
}
