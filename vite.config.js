import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080/',
    },
  },
  resolve: {
    alias: {
      // 절대경로로 접근하기
      '~/components': '/src/components',
      '~/lib': '/src/lib',
      '~/routers': '/src/routers',
      '~/routes': '/src/routes',
      '~/pages': '/src/pages',
      '~/stores': '/src/stores'
    },
  },
});
