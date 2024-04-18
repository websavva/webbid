import type { Options } from 'redaxios';
import { httpClient } from '@/lib/utils/http-client';

import type { User } from '#server/cms/collections/types';

export type GetMeResponse =
  | {
      user: User;
      token: string;
      exp: string;
    }
  | { user: null; token: undefined; exp: undefined };

export const authModule = {
  getMe: (options?: Options) =>
    httpClient.get<GetMeResponse>('users/me', options),

  logout: (options?: Options) =>
    httpClient.post<boolean>('users/logout', options),
};
