import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), basicSsl()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test.setup.js'
  },
  server: {
    proxy: {
      '/auth': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false
      },
      '/spotify': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false
      },
      '/token': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})