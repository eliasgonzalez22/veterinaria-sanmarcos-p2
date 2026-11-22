import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const proxyApi = {
  '/api': {
    target: process.env.BACKEND_URL || 'http://localhost:8081',
    changeOrigin: true,
    configure: (proxy) => {
      proxy.on('proxyReq', (solicitud) => solicitud.removeHeader('origin'))
    },
  },
}

export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173, proxy: proxyApi },
  preview: { host: true, port: 5173, strictPort: true, proxy: proxyApi },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: ['src/utils/**/*.js', 'src/services/**/*.js', 'src/components/**/*.jsx'],
    },
  },
})
