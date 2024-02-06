export const ctx = {
  env: {
    PORT: +process.env.PORT!,

    BASE_URL: process.env.NEXT_PUBLIC_SERVER_URL!,

    SMTP: {
      PORT: +process.env.SMTP_PORT!,
      HOST: process.env.SMTP_HOST!,
      USER: process.env.SMTP_USER,
      PASSWORD: process.env.SMTP_PASSWORD!,
      FROM_ADDRESS: process.env.SMTP_FROM_ADDRESS!,
      FROM_NAME: process.env.SMTP_FROM_NAME!,
    }
  },
};
