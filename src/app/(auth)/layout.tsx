import type { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className='py-20 flex flex-col items-center'>{children}</div>;
}
