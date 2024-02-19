'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import flatry from 'await-to-js';

import { useAuth } from '@/hooks/use-auth';

export default function LogoutPage() {
  const { logout } = useAuth();

  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function onMount() {
    try {
      setPending(true);
      const [err] = await flatry(logout());

      if (err) return toast(err.message || 'Logout has failed !');

      await router.push('/');
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    onMount();
  }, []);

  return <div>Loging out</div>;
}
