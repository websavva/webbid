import { join } from 'path';

import { config } from 'dotenv';

export const loadEnv = (
  stages: Array<'runtime' | 'build'> = ['build', 'runtime'],
) => {
  return stages.forEach((stage) => {
    const fileSuffix = stage === 'runtime' ? '' : `.${stage}`;

    config({
      path: join(process.cwd(), `.env${fileSuffix}`),
    });
  });
};
