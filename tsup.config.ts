import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    outDir: 'dist',
    format: 'cjs',
    entry: ['./src/server/index.ts'],
    watch: options.watch,
    onSuccess: options.watch ? 'node dist/index.js' : undefined,
  };
});
