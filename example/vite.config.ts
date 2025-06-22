import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { hideUrlPort } from 'vite-plugin-hide-url-port'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), hideUrlPort()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
