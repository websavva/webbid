import type { RequestHeaders} from 'redaxios';

import { payloadApi } from '@/lib/payload';

export const loadAuthContext = (headers?: RequestHeaders) => {
  return payloadApi.auth
    .getMe({
      headers,
    })
    .then((res) => res.data);
};
