import { randomBytes } from 'crypto';

import { toAbsoluteUrl } from '@/lib/utils/toAbsoluteUrl';

import { defineEmailTemplate } from './utils/define-email-template';
import { ConfirmationLayout } from './components/ConfirmationLayout';

export interface PasswordResetConfirmationProps {
  token: string;
}

const STATIC_PROPS = {
  Intro:
    "You have requested password reset. In order to proceed, Please follow the confirmation link. If you don't want to reset your password, you can ignore this message.",
  Title: 'Confirm password reset',
  previewText: 'Password Reset Confirmation',
  buttonText: 'Reset password',
};

export const PasswordResetConfirmation = defineEmailTemplate(
  ({ token }: PasswordResetConfirmationProps) => {
    const url = toAbsoluteUrl('/password-reset', token);

    return <ConfirmationLayout {...STATIC_PROPS} url={url} />;
  },
  {
    token: randomBytes(16).toString('hex'),
  }
);
