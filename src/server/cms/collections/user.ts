import type { CollectionConfig } from 'payload/types';

import { SignUpConfirmationTemplate } from '#server/mail/templates';

export const User: CollectionConfig = {
  slug: 'users',

  auth: {
    verify: {
      generateEmailHTML({ user: {
        email
      }, token }) {
        return SignUpConfirmationTemplate({
          email,
          token
        }).html;
      },
    },
  },

  access: {
    read: () => true,
    create: () => true,
  },

  fields: [
    {
      type: 'select',
      name: 'role',
      defaultValue: 'user',
      required: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'user',
          value: 'user',
        },
      ],
    },
  ],
};
