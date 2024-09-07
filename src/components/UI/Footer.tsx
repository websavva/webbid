import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';
import { publicEnv } from '#server/env/public';

import { Logo } from './Logo';
import { Container } from './Container';

export type FooterProps = DefineProps<{}>;

export const Footer = ({ className, ...attrs }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      {...attrs}
      className={cn('flex bg-gray-800 py-8 text-slate-400 sm:py-12', className)}
    >
      <Container className='mx-auto flex w-full items-center justify-center'>
        <Logo className='size-7 sm:size-8' />

        <span className='ml-4 border-l border-l-gray-400 py-1 pl-3 max-sm:text-sm sm:ml-7 sm:py-2 sm:pl-5'>
          &copy; {publicEnv.COMPANY_NAME} - {currentYear}
        </span>
      </Container>
    </footer>
  );
};
