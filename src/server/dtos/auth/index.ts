import { z } from 'zod';

export const UserCredentialsDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export type UserCredentialsDto = z.infer<typeof UserCredentialsDtoSchema>;

export const ConfirmationTokenDtoSchema = z.object({
  token: z.string(),
});

export type ConfirmationTokenDto = z.infer<typeof ConfirmationTokenDtoSchema>;
