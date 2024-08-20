import type { DefineProps } from '@/types';
import { Logo } from '@/components/UI/Logo';

import { ArrowLink } from '../UI/ArrowLink';

export type AuthFormFrameProps = DefineProps<{
  heading: string;
  linkHref: string;
  linkText: string;
}>;

export const AuthFormFrame = ({
  linkHref,
  linkText,
  heading,

  children,
}: AuthFormFrameProps) => {
  return (
    <div className='flex flex-col items-center max-sm:w-11/12'>
      <div className='flex flex-col items-center'>
        <Logo className='w-20 sm:w-28' />

        <h1 className='mt-10 font-semibold text-3xl sm:text-4xl'>{heading}</h1>

        <ArrowLink
          href={linkHref}
          className='sm:text-lg mt-3 text-blue-500 flex items-center hover:underline'
        >
          {linkText}
        </ArrowLink>
      </div>

      <div className='mt-7 max-sm:self-stretch sm:w-[500px]'>{children}</div>
    </div>
  );
};
