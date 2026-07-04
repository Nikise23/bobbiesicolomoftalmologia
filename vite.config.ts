import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiTarget = env.VITE_API_URL || 'https://colom-bobbiesi.onrender.com';
  const apiKey = env.VITE_PUBLIC_API_KEY;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // En dev, evita CORS: el navegador pega a localhost y Vite reenvía al backend.
      proxy: {
        '/api/public/v1': {
          target: apiTarget,
          changeOrigin: true,
          secure: true,
          configure(proxy) {
            proxy.on('proxyReq', (proxyReq) => {
              if (apiKey) {
                proxyReq.setHeader('X-API-Key', apiKey);
              }
              // El backend valida PUBLIC_API_CORS_ORIGIN; en dev no reenviamos Origin.
              proxyReq.removeHeader('origin');
              proxyReq.removeHeader('referer');
            });
          },
        },
      },
    },
  };
});
