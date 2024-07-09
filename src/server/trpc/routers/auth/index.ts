import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import type { CookieOptions } from 'express';

import {
  router,
  publicProcedure,
  privateProcedure,
} from '#server/trpc/helpers';
import {
  ConfirmationTokenDtoSchema,
  ResetPasswordDtoSchema,
  UserCredentialsDtoSchema,
  ChangePasswordDtoSchema,
} from '#server/dtos/auth';
import { CMS } from '#server/cms';
import { privateEnv } from '#server/env/private';
import { User } from '#server/cms/collections/types';
import { publicEnv } from '#server/env/public';
import { PasswordChangeTemplate } from '#server/mail/templates';

export const authRouter = router({
  signUp: publicProcedure
    .input(UserCredentialsDtoSchema)
    .mutation(async ({ input: userCredentialsDto, ctx: { req } }) => {
      const { totalDocs: existingUsersCount } = await CMS.client.find({
        collection: 'users',
        where: {
          email: {
            equals: userCredentialsDto.email,
          },
        },
        limit: 1,

        req,
      });

      if (existingUsersCount > 0)
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Invalid user credentials were provided',
        });

      const signedUpUser = await CMS.client.create({
        collection: 'users',
        data: {
          ...userCredentialsDto,
          role: 'user' as const,
        },

        req,
      });

      return {
        user: signedUpUser,
      };
    }),

  login: publicProcedure
    .input(UserCredentialsDtoSchema)
    .mutation(async ({ input: userCredentialsDto, ctx: { res, req } }) => {
      return CMS.client.login({
        collection: 'users',
        data: userCredentialsDto,

        req,
        res,
      });
    }),

  confirmSignUp: publicProcedure
    .input(ConfirmationTokenDtoSchema)
    .mutation(async ({ input: { token }, ctx: { req } }) => {
      return CMS.client.verifyEmail({
        collection: 'users',
        token,

        req,
      });
    }),

  requestPasswordReset: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(
      async ({
        input: { email },

        ctx: { req },
      }) => {
        const expiredAt =
          Date.now() +
          privateEnv.AUTH.FORGOT_PASSWORD_TOKEN_VALIDITY_DURATION * 60 * 1e3;

        await CMS.client.forgotPassword({
          collection: 'users',

          req,

          data: {
            email,
          },

          expiration: expiredAt,
        });

        return {
          email,
        };
      }
    ),

  resetPassword: publicProcedure.input(ResetPasswordDtoSchema).mutation(
    async ({
      input: { token, password: newPassword },

      ctx: { req, res },
    }) => {
      const { user } = await CMS.client.resetPassword({
        collection: 'users',

        req,

        data: {
          token,
          password: newPassword,
        },

        overrideAccess: true,
      });

      const { email } = user as unknown as User;

      const authInfo = await CMS.client.login({
        collection: 'users',
        data: {
          email,
          password: newPassword,
        },

        req,
        res,
      });

      const { html, text } = PasswordChangeTemplate();
      await CMS.client
        .sendEmail({
          subject: 'Password Changed',
          html,
          text,
          to: authInfo.user.email,
        })
        .catch((err) => {
          console.error(`[email]: Password Changed email was not sent ${err}`);
        });

      return authInfo;
    }
  ),

  getMe: privateProcedure.query(async ({ ctx: { user, req } }) => {
    return CMS.client
      .findByID({
        id: user.id,
        collection: 'users',
        depth: 1,
        overrideAccess: false,
        req,
        showHiddenFields: false,
      })
      .then((user) => ({ user }))
      .catch((err) => {
        console.error('[getMe]: ', err);

        return {
          user: null,
        };
      });
  }),

  logout: privateProcedure.mutation(async ({ ctx: { res } }) => {
    const {
      users: {
        config: { auth: collectionAuthConfig },
      },
    } = CMS.client.collections;

    const cookieOptions: CookieOptions = {
      domain: undefined,
      httpOnly: true,
      path: '/',
      sameSite: collectionAuthConfig.cookies.sameSite,
      secure: collectionAuthConfig.cookies.secure,
    };

    if (collectionAuthConfig.cookies.domain)
      cookieOptions.domain = collectionAuthConfig.cookies.domain;

    res.clearCookie(`${CMS.client.config.cookiePrefix}-token`, cookieOptions);

    return true;
  }),

  changePassword: privateProcedure
    .input(ChangePasswordDtoSchema)
    .mutation(
      async ({ input: { password, newPassword }, ctx: { user, req, res } }) => {
        await CMS.client.login({
          collection: 'users',
          data: {
            email: user.email,
            password: password,
          },

          req,
        });

        const token = await CMS.client.forgotPassword({
          collection: 'users',
          disableEmail: true,
          data: {
            email: user.email,
          },
          req,
        });

        await CMS.client.resetPassword({
          collection: 'users',
          overrideAccess: true,
          data: {
            token,
            password: newPassword,
          },

          req,
        });

        const { user: updatedUser } = await CMS.client.login({
          collection: 'users',
          data: {
            email: user.email,
            password: newPassword,
          },
          req,
          res,
        });

        return {
          user: updatedUser,
        };
      }
    ),
});
