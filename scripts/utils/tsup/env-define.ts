import '../../../src/server/env/load-build';

const BUILD_ENV_WHITE_LIST = [
  'NODE_ENV',
  'PORT',
  'BUILD_TARGET',
  'PAYLOAD_CONFIG_PATH',
  'NEXT_PUBLIC_SERVER_URL',
  'NEXT_PUBLIC_COMPANY_NAME',
  'NEXT_PUBLIC_SUPPORT_EMAIL',
  'NEXT_PUBLIC_DOMAIN',
  'NEXT_PUBLIC_SERVICE_FEE_PERCENTAGE'
];

export const buildEnvDefine = Object.fromEntries(
  BUILD_ENV_WHITE_LIST.map((envName) => [
    `process.env.${envName}`,
    JSON.stringify(process.env[envName]),
  ]),
);
