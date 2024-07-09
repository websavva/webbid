import type { FC, JSX } from 'react';
import { render } from '@react-email/components';

export function defineEmailTemplate<P>(Component: FC<P>, previewProps?: P) {
  const EmailTemplate = (props?: P) => {
    const derivedProps = props || ({} as P & JSX.IntrinsicAttributes);

    const renderedComponent = <Component {...derivedProps} />;

    const html = render(renderedComponent);
    const text = render(renderedComponent, {
      plainText: true,
    });

    return {
      html,
      text,
    };
  };

  EmailTemplate.previewProps = previewProps;

  return EmailTemplate;
}
