import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Rutas relativas en el build, para que funcione aunque se publique en una subcarpeta
  // (por ejemplo en GitHub Pages, que sirve el proyecto en /nombre-del-repo/)
  base: './',
});
