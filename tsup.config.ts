import { defineConfig } from 'tsup';
import dotenv from 'dotenv';

dotenv.config();

const filteredEnv = Object.fromEntries(
  [
    'PORT',
    'NEXT_PUBLIC_SERVER_URL',
    'POSTGRES_DB',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
  ].map((name) => [`process.env.${name}`, JSON.stringify(process.env[name]!)])
);

export default defineConfig((options) => {
  return {
    entry: ['./src/server/index.ts', './payload.config.ts'],
    outDir: 'dist',
    format: 'cjs',
    define: filteredEnv,
    watch: options.watch,
    onSuccess: options.watch ? 'PAYLOAD_CONFIG_PATH=dist/payload.config.js node dist/index.js' : undefined,
  };
});
