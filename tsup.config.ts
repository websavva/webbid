import { defineConfig } from 'tsup';
import dotenv from 'dotenv';

dotenv.config();

const filteredEnv = Object.fromEntries(
  ['PORT'].map((name) => [`process.env.${name}`, process.env[name]!])
);

export default defineConfig((options) => {
  return {
    entry: ['./src/server/index.ts'],
    outDir: 'dist',
    format: 'cjs',
    define: filteredEnv,
    watch: options.watch,
    onSuccess: options.watch ? 'node dist/index.js' : undefined,
  };
});
