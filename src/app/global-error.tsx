'use client';

import './globals.css';
import Layout from '@/components/UI/Layout';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <Layout>{error.message}</Layout>;
}
