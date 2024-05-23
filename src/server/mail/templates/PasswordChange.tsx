
import { defineEmailTemplate } from './utils/define-email-template';

import { Layout } from './components/Layout';

export interface PasswordChangeTemplateProps {
  email: string;
}

export const PasswordChangeTemplate = defineEmailTemplate(
  ({ email }: PasswordChangeTemplateProps) => {

    return <Layout previewText='Password changed'>

    </Layout>
  },
  {
    email: 'user@example.com',
  }
);
