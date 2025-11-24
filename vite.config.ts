import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow network access and whitelist external hosts (e.g. ngrok tunnels)
    host: true,
    // Add any external hostnames that need to be allowed to access the dev server.
    // Example: add the ngrok domain shown in the error to allow PayOS redirect back to the frontend.
    allowedHosts: [
      'incongruous-unexpectedly-nia.ngrok-free.dev'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
