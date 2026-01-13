import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: '/kineticedgeperformance/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                compare: resolve(__dirname, 'src/pages/compare.html'),
            },
        },
    },
})
