import { Html, Body, Link } from '@react-email/components';
import { joinURL, createURL } from 'ufo';

import { defineEmailTemplate } from './define-email-template';
import { ctx } from '#server/context';

export interface SignUpConfirmationTemplateProps {
  email: string;
  token: string;
}

export const SignUpConfirmationTemplate = defineEmailTemplate(
  ({ email, token }: SignUpConfirmationTemplateProps) => {
    const url = joinURL(ctx.env.BASE_URL!, '/sign-up/confirm', token);

    return (
      <Html>
        <Body>
          <span>{email}</span>
          <Link href={url}>
            Confirm account
          </Link>
        </Body>
      </Html>
    );
  }
);
