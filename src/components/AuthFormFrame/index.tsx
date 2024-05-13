import type { DefineProps } from '@/types';
import { Logo } from '@/components/ui/Logo';

import { ArrowLink } from '../ui/ArrowLink';

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
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        <Logo className='w-28' />

        <h1 className='mt-10 font-semibold text-4xl'>{heading}</h1>

        <ArrowLink
          href={linkHref}
          className='text-lg mt-3 text-blue-500 flex items-center hover:underline'
        >
          {linkText}
        </ArrowLink>
      </div>

      <div className='mt-7 w-[500px]'>{children}</div>
    </div>
  );
};
