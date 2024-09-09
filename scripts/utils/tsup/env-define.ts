import '../../../src/server/env/load-build';

const BUILD_ENV_WHITE_LIST = [
  'NODE_ENV',
  'PORT',
  'BUILD_TARGET',
  'PAYLOAD_CONFIG_PATH',
  'NEXT_PUBLIC_SERVER_URL',
];

export const builEnvDefine = Object.fromEntries(
  BUILD_ENV_WHITE_LIST.map((envName) => [
    `process.env.${envName}`,
    JSON.stringify(process.env[envName]),
  ]),
);
