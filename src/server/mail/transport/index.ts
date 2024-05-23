import { createTransport } from 'nodemailer';
import { isProduction } from 'std-env';

import { privateEnv } from '#server/env/private';

export const createSMTPransport = async () => {
  const {
    SMTP: { PORT: port, HOST: host, USER: user, PASSWORD: password },
  } = privateEnv;

  const authOptions = isProduction
    ? {
        user,
        password,
      }
    : undefined;

  const transport = createTransport({
    port,
    host,
    auth: authOptions,
    secure: isProduction,
  });

  await transport.verify();

  return transport;
};
