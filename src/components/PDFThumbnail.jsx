import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Maximize2 } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';
import './PDFThumbnail.css';

const THUMBNAIL_WIDTH = 250;

const errorMessage = <div className="error-state">Failed to load PDF</div>;

// Tarjeta de la cuadrícula: muestra solo la primera página del PDF
function PDFThumbnail({ file, onClick }) {
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="pdf-thumbnail animate-fade-in" onClick={onClick}>
      <div className="thumbnail-wrapper">
        {/* El `error` de <Document> cubre los PDF que no se pueden leer, y el ErrorBoundary
            cualquier otro fallo al pintar. Así un archivo roto no tumba toda la galería. */}
        <ErrorBoundary fallback={errorMessage}>
          <Document
            file={file}
            onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
            loading={<div className="loading-skeleton">Loading...</div>}
            error={errorMessage}
          >
            {/* Sin capas de texto ni enlaces: en una miniatura no hacen falta y carga más rápido */}
            <Page
              pageNumber={1}
              width={THUMBNAIL_WIDTH}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </ErrorBoundary>

        {/* Es un botón para poder abrir el PDF con el teclado (Tab + Enter).
            No necesita onClick propio: el clic sube hasta el div de fuera. */}
        <button type="button" className="overlay" aria-label={`Open ${file.name}`}>
          <Maximize2 size={24} />
        </button>
      </div>

      <div className="file-info">
        <span className="file-name" title={file.name}>{file.name}</span>
        {numPages && <span className="page-count">{numPages} pages</span>}
      </div>
    </div>
  );
}

export default PDFThumbnail;
