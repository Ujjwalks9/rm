import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
  const { default: postcssTailwindcss } = await import('tailwindcss');
  const { default: postcssAutoprefixer } = await import('autoprefixer');

  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: true,
    },
    build: {
      outDir: 'dist',
    },
    css: {
      postcss: {
        plugins: [
          postcssTailwindcss,
          postcssAutoprefixer,
        ],
      },
    },
  };
});