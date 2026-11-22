import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Proxy hacia el backend: el navegador llama a /api/v1/... en el MISMO origen del frontend
// (http://IP:5173) y Vite reenvía la solicitud al backend que corre en la misma EC2.
// Ventajas: la compilación no depende de la IP pública (cambia al reiniciar el laboratorio)
// y no hace falta CORS para el frontend. Swagger sigue en http://IP:8081/swagger-ui.html.
const proxyApi = {
  '/api': {
    target: process.env.BACKEND_URL || 'http://localhost:8081',
    changeOrigin: true,
    // El backend ve una solicitud del mismo servidor: se quita el Origin del navegador.
    configure: (proxy) => {
      proxy.on('proxyReq', (solicitud) => solicitud.removeHeader('origin'))
    },
  },
}

export default defineConfig({
  plugins: [react()],
  // npm run dev (desarrollo)
  server: { host: true, port: 5173, proxy: proxyApi },
  // npm start = vite preview (versión compilada que se muestra en la demo)
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
