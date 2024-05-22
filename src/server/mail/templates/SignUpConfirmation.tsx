import { joinURL } from 'ufo';
import { Section } from '@react-email/components';
import { randomBytes } from 'crypto';

import { defineEmailTemplate } from './utils/define-email-template';

import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { Heading } from './components/Heading';
import { Text } from './components/Text';
import { Hr } from './components/Hr';

export interface SignUpConfirmationTemplateProps {
  token: string;
}

export const SignUpConfirmationTemplate = defineEmailTemplate(
  ({ token }: SignUpConfirmationTemplateProps) => {
    const url = joinURL(
      process.env.NEXT_PUBLIC_SERVER_URL!,
      '/sign-up/confirm',
      token
    );

    return (
      <Layout previewText='Email Confirmations'>
        <Section style={{ padding: '20px 35px 10px' }}>
          <Heading>Verify your email address</Heading>

          <Text style={{ marginBottom: '14px' }}>
            Thanks for starting the new account creation process at
            DigitalMarketplace. We want to make sure it&apos;s really you.
            Please follow the confirmation link before to continue. If you
            don&apos;t want to create an account, you can ignore this message.
          </Text>

          <Button
            href={url}
            style={{
              width: 200,
              margin: '10px auto',
            }}
          >
            Confirm
          </Button>

          <Text>
            Or you can copy and and browse to the link:
            <br />
            <span
              style={{
                color: 'rgb(37, 99, 235)',
              }}
            >
              {url}
            </span>
          </Text>
        </Section>

        <Hr />

        <Section style={{ padding: '25px 35px' }}>
          <Text style={{ margin: 0 }}>
            DigitalMarketplace will never email you and ask you to disclose or
            verify your password, credit card, or banking account number.
          </Text>
        </Section>
      </Layout>
    );
  },
  {
    token: randomBytes(16).toString('hex'),
  }
);
