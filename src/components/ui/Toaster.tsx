'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-red-500 group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:py-6 group-[.toaster]:text-sm group-[.toaster]:px-4 flex items-center justify-center',
          error: 'group-[.toaster]:text-red-500',
          info: 'group-[.toaster]:text-blue-500',
          warning: 'group-[.toaster]:text-yellow-500',
          success: 'group-[.toaster]:text-green-500',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          closeButton: 'text-red-500',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
