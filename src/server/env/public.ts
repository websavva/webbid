export const publicEnv = {
  BASE_URL: process.env.NEXT_PUBLIC_SERVER_URL!,

  SERVICE_FEE_PERCENTAGE: +process.env.NEXT_PUBLIC_SERVICE_FEE_PERCENTAGE!,

  COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME!,
  SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL!,
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN!,

  BUILD_STAGE: process.env.BUILD_STAGE || 'development',
};
