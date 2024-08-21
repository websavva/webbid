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
      className={cn('bg-gray-800 py-8 sm:py-12 flex text-slate-400', className)}
    >
      <Container className='flex items-center mx-auto justify-center w-full'>
        <Logo className='size-7 sm:size-8' />

        <span className='ml-4 sm:ml-7 pl-3 sm:pl-5 py-1 sm:py-2 max-sm:text-sm border-l border-l-gray-400'>
          &copy; {publicEnv.COMPANY_NAME} - {currentYear}
        </span>
      </Container>
    </footer>
  );
};
