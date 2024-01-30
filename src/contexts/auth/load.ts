import { payloadApi } from '@/lib/payload';

export const loadAuthContext = (headers?: Headers) => {
  return payloadApi.auth
    .getMe({
      headers,
    })
    .then((res) => res.data);
};
