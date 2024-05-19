import { applyGuards } from '@/lib/utils/guards';
import { guest } from '@/guards/guest';

import { RequestPasswordResetForm } from '@/components/ui/auth/RequestPasswordResetForm';

export default async function PasswordResetPage() {
  await applyGuards(guest);

  return <RequestPasswordResetForm />;
}
