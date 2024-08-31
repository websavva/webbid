import { Section } from '@react-email/components';

import { publicEnv } from '@/server/env/public';

import { defineEmailTemplate } from './utils/define-email-template';

import { Layout } from './components/Layout';
import { Text } from './components/Text';
import { Link } from './components/Link';

export interface PasswordChangeTemplateProps {}

export const PasswordChangeTemplate = defineEmailTemplate(() => {
  return (
    <Layout previewText='Password changed'>
      <Section
        style={{
          padding: '10px 30px',
        }}
      >
        <Text>
          Your login password has been changed. If you believe this is an error,
          contact us by this email address{' '}
          <Link href={`mailto:${publicEnv.SUPPORT_EMAIL}`}>
            {publicEnv.SUPPORT_EMAIL}
          </Link>
        </Text>
      </Section>
    </Layout>
  );
});
