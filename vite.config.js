import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const certsDir = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../../../certs')
const https = {
  key: fs.readFileSync(path.join(certsDir, 'ssl.key')),
  cert: fs.readFileSync(path.join(certsDir, 'ssl.cert')),
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = parseInt(env.PORT) || 5173
  const backendHost = env.VITE_BACKEND_URL

  return {
    plugins: [
      vue(),
      // vueDevTools(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      host: 'localhost',
      port,
      https,
      // Same-origin proxy avoids browser CORS against the TLS API.
      proxy: {
        '/v1': {
          target: backendHost,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      host: 'localhost',
      port,
      https,
      proxy: {
        '/v1': {
          target: backendHost,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
