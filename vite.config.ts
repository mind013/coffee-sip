import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ChatbotWidget',
      formats: ['es', 'umd'],
      fileName: (format) => `coffee-sip.${format}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: 'coffee-sip.[ext]',
      },
    },
    sourcemap: true,
  },
  server: {
    open: '/demo/index.html',
  },
});
