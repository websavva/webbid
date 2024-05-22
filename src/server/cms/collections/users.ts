import type { CollectionConfig } from 'payload/types';

import { Role } from '@/consts/roles';

import { SignUpConfirmationTemplate } from '#server/mail/templates';
import { ctx } from '#server/context';

export const Users: CollectionConfig = {
  slug: 'users',

  auth: {
    maxLoginAttempts: 5,

    verify: {
      generateEmailHTML({ user, token }) {
        return SignUpConfirmationTemplate({
          token,
        }).html;
      },
    },

    forgotPassword: {
      generateEmailHTML(payload) {
        return `${ctx.env.BASE_URL}/password-reset/${payload!.token}`;
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
