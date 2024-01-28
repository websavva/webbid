import type { FC } from 'react';
import { render } from '@react-email/components';

export function defineEmailTemplate<P extends Record<string, any> = {}>(
  Component: FC<P>
) {
  return (props: P) => {
    const html = render(<Component {...props} />);
    const text = render(<Component {...props} />, {
      plainText: true,
    });

    return {
      html,
      text,
    };
  };
}
