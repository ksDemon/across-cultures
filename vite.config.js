import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({command, mode }) => {
  return {
    publicDir: '../public',
    root: 'src',
    build: {
      emptyOutDir: false,
      outDir: '../dist'
    }
  }
});