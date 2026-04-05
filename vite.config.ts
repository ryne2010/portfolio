import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolvePagesBasePath } from './src/lib/pages-base-path';

export default defineConfig({
  base: resolvePagesBasePath(process.env),
  plugins: [tailwindcss(), react()],
});
