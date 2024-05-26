import { defineConfig } from 'vite'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    plugins: [
        react(),
        eslintPlugin(),
        svgr({
            include: '**/*.svg',
        }),
    ],
    build: {
        target: 'esnext',
    },
    server: {
        host: true,
        port: 8080,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
