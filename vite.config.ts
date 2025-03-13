import external from 'unplugin-external/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

/// <reference types="vitest" />
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
  },
  plugins: [
    dts(),
    external(),
  ],
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**'],
    },
  },
})
