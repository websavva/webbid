import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('../src', import.meta.url)),
      },
      {
        find: '#server',
        replacement: fileURLToPath(new URL('../src/server', import.meta.url)),
      },
    ],
  },
});
