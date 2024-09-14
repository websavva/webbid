import { join } from 'path';

import dotenv from 'dotenv';

export const loadEnv = (
  stages: Array<'runtime' | 'build'> = ['build', 'runtime'],
) => {
  return stages.forEach((stage) => {
    const fileSuffix = stage === 'runtime' ? '' : `.${stage}`;

    dotenv.config({
      path: join(process.cwd(), `.env${fileSuffix}`),
    });
  });
};
