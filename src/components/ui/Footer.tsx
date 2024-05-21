import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';

import { Logo } from './Logo';
import { Container } from './Container';

export type FooterProps = DefineProps<{}>;

export const Footer = ({ className, ...attrs }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      {...attrs}
      className={cn('bg-gray-800 py-12 flex text-slate-400', className)}
    >
      <Container className='flex items-center mx-auto justify-center w-full'>
        <Logo className='size-8' />

        <span className='ml-7 pl-5 py-2 border-l border-l-gray-400'>
          &copy; Digital Marketplace, {currentYear}
        </span>
      </Container>
    </footer>
  );
};
