import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import url from '@rollup/plugin-url'

export default defineConfig({
  plugins: [
    vue(),
    url({
      limit: 100000,
      include: [
        '**/*.svg', '**/*.png', '**/*.jpg', '**/*.gif', '**/*.eot', '**/*.woff', '**/*.woff2', '**/*.ttf'
      ],
      fileName: '[name].[ext]'
    }),
    visualizer()
  ],
  build: {
    minify: 'esbuild'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})