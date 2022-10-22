import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default ({ mode }) => defineConfig({
    build: { sourcemap: true },
    plugins: [glsl({
        compress: mode === 'production',
        warnDuplicatedImports: false,
        root: '/src/glsl/lygia'
    })]
});