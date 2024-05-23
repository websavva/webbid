export const privateEnv = {
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET!,

  PORT: +process.env.PORT!,

  SMTP: {
    PORT: +process.env.SMTP_PORT!,
    HOST: process.env.SMTP_HOST!,
    USER: process.env.SMTP_USER,
    PASSWORD: process.env.SMTP_PASSWORD!,
  },

  STRIPE: {
    SERVICE_FEE_PERCENTAGE: +process.env.NEXT_PUBLIC_SERVICE_FEE_PERCENTAGE!,
    API_KEY: process.env.STRIPE_API_SECRET_KEY!,
    STRIPE_ORDER_SESSION_VALIDITY_DURATION:
      +process.env.STRIPE_ORDER_SESSION_VALIDITY_DURATION!,
  },

  AUTH: {
    FORGOT_PASSWORD_TOKEN_VALIDITY_DURATION:
      +process.env.AUTH_FORGOT_PASSWORD_TOKEN_VALIDITY_DURATION!,
  },
};
