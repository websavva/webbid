import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils/cn';

const intInter = Inter({ subsets: ['latin'] });

export default function Layout({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <html lang='en' className={cn('text-[90%] 3xl:text-[100%]', className)}>
      <body className={cn('relative font-sans', intInter.className)}>
        <div className='flex min-h-screen flex-col'>{children}</div>
      </body>
    </html>
  );
}
