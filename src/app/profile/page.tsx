import { applyGuards } from '@/lib/utils/guards';
import { auth } from '@/guards/auth';

import ProfileClientPage from './page_client';
import { Container } from '@/components/UI/Container';

export default async function ProfilePage() {
  await applyGuards(auth);

  return (
    <div className='mx-auto pt-20 max-w-3xl'>
      <ProfileClientPage />
    </div>
  );
}
