import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Enable relative asset paths for static/preview builds
  server: {
    port: 3000,
    open: true
  }
})
