import vue from '@vitejs/plugin-vue'
import external from 'unplugin-external/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
  },
  plugins: [
    vue(),
    dts(),
    external(),
  ],
})
