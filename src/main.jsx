import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { pdfjs } from 'react-pdf';
import App from './App.jsx';
import './index.css';

// pdf.js lee los PDF en un Web Worker (un hilo aparte) para no congelar la página.
// Aquí se le dice dónde está el archivo del worker; Vite resuelve la ruta con import.meta.url.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
