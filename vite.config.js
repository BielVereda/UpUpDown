import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  // carrega TODAS as variáveis do .env (sem prefixo VITE_ = não vai pro bundle)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
      proxy: {
        '/ra': {
          target: 'https://retroachievements.org',
          changeOrigin: true,
          rewrite: (p) => {
            const u = new URL(p, 'http://x')
            u.searchParams.set('z', env.RA_USER || '')
            u.searchParams.set('y', env.RA_API_KEY || '')
            return '/API' + u.pathname.replace(/^\/ra/, '') + u.search
          },
        },
      },
    },
  }
})
