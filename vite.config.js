import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
    build: { sourcemap: true },
    plugins: [glsl()]
});