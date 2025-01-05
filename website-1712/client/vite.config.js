/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/) https://v0.vitest.dev/guide/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    }
  },
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    globals: true,       // Use global test APIs like `describe`, `it`, etc.
    environment: 'jsdom', // Testing environment ('node' or 'jsdom')
    setupFiles: './tests/setup/vitest.setup.js', // Optional: Path to setup file
    css: true,            // Allow CSS imports for testing styled components
    coverage: {
      reporter: ['text', 'json', 'html'], // Optional: Add coverage reporters
      include: ['src/**/*.{js,ts,jsx,tsx}'], // Include only your source files
    },
  },
});