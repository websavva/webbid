import type { ReactNode } from 'react';
import { Section } from '@react-email/components';

import { Layout } from './Layout';
import { Button } from './Button';
import { Heading } from './Heading';
import { Text } from './Text';
import { Hr } from './Hr';

export interface ConfirmationLayoutProps {
  url: string;
  Title: ReactNode;
  Intro: ReactNode;
  previewText: string;
  buttonText?: string;
}

export const ConfirmationLayout = ({
  url,
  Title,
  Intro,
  previewText,
  buttonText = 'Confirm',
}: ConfirmationLayoutProps) => {
  return (
    <Layout previewText={previewText}>
      <Section style={{ padding: '20px 35px 10px' }}>
        <Heading>{Title}</Heading>

        <Text style={{ marginBottom: '14px' }}>{Intro}</Text>

        <Button
          href={url}
          style={{
            width: 200,
            margin: '10px auto',
          }}
        >
          {buttonText}
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
};
