import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

const channel = (() => {
  const raw = process.env.OPENCODE_CHANNEL
  if (raw === 'dev' || raw === 'beta' || raw === 'prod') return raw
  if (raw === 'latest') return 'prod'
  return 'dev'
})()

export default defineConfig({
  main: {
    define: {
      'import.meta.env.OPENCODE_CHANNEL': JSON.stringify(channel)
    }
  },
  preload: {
    build: {
      lib: {
        entry: resolve('src/preload/index.ts'),
        formats: ['cjs'],
        fileName: () => 'index.cjs',
      },
    },
  },
  renderer: {
    root: 'src/renderer',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          main: resolve('src/renderer/index.html'),
          loading: resolve('src/renderer/loading.html')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
