import { Html, Body, Link } from '@react-email/components';

import { defineEmailTemplate } from './define-email-template';
import { ctx } from '@/server/context';

export interface SignUpConfirmationTemplateProps {
  email: string;
  token: string;
}

export const SignUpConfirmationTemplate = defineEmailTemplate(
  ({ email, token }: SignUpConfirmationTemplateProps) => {
    const url = `http://localhost:3000/sign-up/confirm?token=${token}`;

    return (
      <Html>
        <Body>
          <span>{email}</span>
          <Link href={`http/sign-up/confirm?token=${token}`}>
            Confirm account
          </Link>
        </Body>
      </Html>
    );
  }
);
