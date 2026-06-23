import { defineConfig } from 'vinxi';
import react from '@vitejs/plugin-react';
import { tanstackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig({
  plugins: [
    tanstackRouterVite(),
    react()
  ]
});