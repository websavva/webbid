import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./payload.config.ts'],
  format: 'cjs',
  outDir: 'dist',
});
