import { router, publicProcedure } from '#server/trpc/helpers';
import {
  ConfirmationTokenDtoSchema,
  UserCredentialsDtoSchema,
} from '#server/dtos/auth';
import { CMS } from '#server/cms';
import { TRPCError } from '@trpc/server';

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
});
