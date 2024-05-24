import { randomBytes } from 'crypto';

import { toAbsoluteUrl } from '@/lib/utils/toAbsoluteUrl';
import { publicEnv } from '#server/env/public';

import { defineEmailTemplate } from './utils/define-email-template';
import { ConfirmationLayout } from './components/ConfirmationLayout';

export interface SignUpConfirmationTemplateProps {
  token: string;
}

const STATIC_PROPS = {
  Title: 'Confirm your email address',
  Intro: `Thanks for starting the new account creation process at ${publicEnv.COMPANY_NAME}. We want to make sure it's really you.Please follow the confirmation link before to continue. If you don't want to create an account, you can ignore this message.`,
  previewText: 'Email Confirmation',
  buttonText: 'Confirm email',
};

export const SignUpConfirmationTemplate = defineEmailTemplate(
  ({ token }: SignUpConfirmationTemplateProps) => {
    const url = toAbsoluteUrl('/sign-up/confirm', token);

    return <ConfirmationLayout {...STATIC_PROPS} url={url} />;
  },
  {
    token: randomBytes(16).toString('hex'),
  }
);
