import { router, publicProcedure } from '#server/trpc/helpers';
import { SignUpUserDtoSchema } from '#server/dtos/auth';
import { CMS } from '#server/cms';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
  signUp: publicProcedure
    .input(SignUpUserDtoSchema)
    .mutation(async ({ input: signUpUserDto }) => {
      const { totalDocs: existingUsersCount } = await CMS.client.find({
        collection: 'users',
        where: {
          email: {
            equals: signUpUserDto.email,
          },
        },
        limit: 1,
      });

      if (existingUsersCount > 0)
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Invalid user credentials were provided',
        });

      const signedUpUser = await await CMS.client.create({
        collection: 'users',
        data: {
          ...signUpUserDto,
          role: 'user',
        },
      });

      return {
        user: signedUpUser,
      };
    }),
});
