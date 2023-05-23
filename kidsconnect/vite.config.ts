import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
    mode: 'production',
    build: {
        outDir: 'dist',
        minify: true,
        sourcemap: false,
        rollupOptions: {
            input: {
                main: './src/index.html', // Update with your actual index.html file location
            },
        },
    },
    plugins: [
        reactRefresh(),
        // gzipPlugin(),
    ],
    define: {
        'process.env': {
            // Define your production environment variables here
            NODE_ENV: '"production"',
        },
    },
    optimizeDeps: {
        exclude: ['debug', 'node_modules'],
    },
    server: {
        hmr: {
            overlay: false,
        },
    },
});
