import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE');
    return {
        base: '/',
        plugins: [react()],
        build: {
            outDir: '../server/static',
            emptyOutDir: false,
        },
        server: {
            port: env.DEV_SERVER_PORT ? Number(env.DEV_SERVER_PORT) : 8001,
            // watch: {},
        },
    };
});
