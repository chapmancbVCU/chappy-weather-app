import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react'; // ✅ ADD THIS
import FullReload from 'vite-plugin-full-reload';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
    publicDir: false,
    build: {
        outDir: 'public/build',
        assetsDir: 'assets',
        manifest: true,
        rollupOptions: {
            input: {
                main: 'resources/js/app.jsx',   // ✅ use .jsx for React entry
                styles: 'resources/css/app.css',
            },
        },
    },
    server: {
        origin: 'http://localhost:5173',
        watch: {
            ignored: ['!**/resources/view/**', '!**/resources/views/**'],
        },
        cors: true,
        fs: {
            allow: [
                '..', 
                'node_modules',
                path.resolve(__dirname, 'vendor/chappy-php/chappy-php-framework'),
            ]
        },
    },
    resolve: {
        alias: {
            tinymce: path.resolve(__dirname, 'node_modules/tinymce'),
            '@tinymce/tinymce-react': path.resolve(__dirname, 'node_modules/@tinymce/tinymce-react'),
            '@': path.resolve(__dirname, 'resources/js'),
            '@chappy': path.resolve(__dirname, 'vendor/chappy-php/chappy-php-framework/src/React'),
            '@css': path.resolve(__dirname, 'resources/css'),
        }
    },
    plugins: [
        react(), // ✅ enables React fast refresh + JSX/TSX support
        FullReload(['resources/view/**/*.php', 'resources/views/**/*.php']),
    ],
    // Fixes tinymce not found
    optimizeDeps: {
        include: ['@tinymce/tinymce-react', 'tinymce'],
    },
});
