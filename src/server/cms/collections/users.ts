import type { CollectionConfig } from 'payload/types';

import { Role } from '@/consts/roles';

import {
  SignUpConfirmationTemplate,
  PasswordResetConfirmation,
} from '#server/mail/templates';
import { ctx } from '#server/context';

export const Users: CollectionConfig = {
  slug: 'users',

  auth: {
    maxLoginAttempts: 5,

    verify: {
      generateEmailHTML({ token }) {
        return SignUpConfirmationTemplate({
          token,
        }).html;
      },

      generateEmailSubject: () => 'Email Confirmation',
    },

    forgotPassword: {
      generateEmailHTML(payload) {
        return PasswordResetConfirmation({
          token: payload?.token!,
        }).html;
      },

      generateEmailSubject: () => 'Password Reset Confirmation',
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
