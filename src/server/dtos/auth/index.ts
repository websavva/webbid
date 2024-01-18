import { z } from 'zod';

export const SignUpUserDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export type SignUpUserDto = z.infer<typeof SignUpUserDtoSchema>;
