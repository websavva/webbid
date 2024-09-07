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

        <h1 className='mt-10 text-3xl font-semibold sm:text-4xl'>{heading}</h1>

        <ArrowLink
          href={linkHref}
          className='mt-3 flex items-center text-blue-500 hover:underline sm:text-lg'
        >
          {linkText}
        </ArrowLink>
      </div>

      <div className='mt-7 max-sm:self-stretch sm:w-[500px]'>{children}</div>
    </div>
  );
};
