import { joinURL } from 'ufo';

import { publicEnv } from '#server/env/public';

export const toAbsoluteUrl = (...paths: string[]) =>
  joinURL(publicEnv.BASE_URL, ...paths);
