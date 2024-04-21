import type { CollectionConfig } from 'payload/types';

import { SignUpConfirmationTemplate } from '#server/mail/templates';
import { Role } from '@/consts/roles';

export const Users: CollectionConfig = {
  slug: 'users',

  auth: {
    verify: {
      generateEmailHTML({ user: { email }, token }) {
        return SignUpConfirmationTemplate({
          email,
          token,
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
      options: Object.entries(Role).map(([label, value]) => ({
        label,
        value,
      })),
    },
  ],
};
