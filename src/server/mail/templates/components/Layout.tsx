import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from '@react-email/components';

import { Text } from './Text';
import { Hr } from './Hr';
import { Logo } from './Logo';
import { PropsWithChildren } from 'react';

export type LayoutProps = PropsWithChildren<{
  previewText: string;
}>;

export const Layout = ({ previewText, children }: LayoutProps) => (
  <Html>
    <Head>
      <title>{previewText}</title>
    </Head>

    <Preview>{previewText}</Preview>
    <Body
      style={{
        backgroundColor: '#ffffff',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
      }}
    >
      <Container
        style={{
          margin: '0 auto',
          padding: '20px 0 48px',
        }}
      >
        <Logo width='50' height='auto' />

        {children}
        <Hr />

        {/* Footer */}
        <Text
          style={{
            color: '#8898aa',
            fontSize: '12px',
          }}
        >
          470 Noor Ave STE B #1148, South San Francisco, CA 94080
        </Text>
      </Container>
    </Body>
  </Html>
);
