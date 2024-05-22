import { joinURL } from 'ufo';

import { defineEmailTemplate } from './utils/define-email-template';
import { ctx } from '#server/context';

import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { Text } from './components/Text';

export interface SignUpConfirmationTemplateProps {
  email: string;
  token: string;
}

export const SignUpConfirmationTemplate = defineEmailTemplate(
  ({ email, token }: SignUpConfirmationTemplateProps) => {
    const url = joinURL(ctx.env.BASE_URL!, '/sign-up/confirm', token);

    return (
      <Layout previewText='Email Confirmations'>
        <Text>{email}</Text>

        <Button href={url}>Confirm Email</Button>
      </Layout>
    );
  },
  {
    email: 'admin@example.com',
    token: 'asd129ds14213',
  }
);
