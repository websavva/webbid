import { createTransport } from 'nodemailer';

import { privateEnv } from '#server/env/private';
import { publicEnv } from '#server/env/public';

export const createSMTPransport = async () => {
  const {
    SMTP: { PORT: port, HOST: host, USER: user, PASSWORD: password },
  } = privateEnv;

  const isDev = publicEnv.BUILD_TARGET !== 'production';

  const authOptions = !isDev
    ? {
        user,
        password,
      }
    : undefined;

  const transport = createTransport({
    port,
    host,
    auth: authOptions,
    secure: !isDev,
  });

  await transport.verify();

  return transport;
};
