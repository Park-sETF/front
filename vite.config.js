import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://43.201.75.185:8080',
      changeOrigin: true,           // Origin 헤더를 백엔드 주소로 변경
      secure: false,                // HTTPS가 아닌 경우 false
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
