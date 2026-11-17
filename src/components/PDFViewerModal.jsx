import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';
// Estilos de react-pdf para la capa de texto (poder seleccionar y copiar) y la de enlaces.
// Sin ellos el texto se pinta descolocado encima de la página.
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import './PDFViewerModal.css';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.2;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Visor a pantalla completa con paginación y zoom
function PDFViewerModal({ file, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  // Uso la forma con función (current => ...) porque el nuevo valor depende del anterior
  function changePage(offset) {
    setPageNumber((current) => clamp(current + offset, 1, numPages ?? 1));
  }

  function changeZoom(delta) {
    setScale((current) => clamp(current + delta, MIN_ZOOM, MAX_ZOOM));
  }

  // Atajos de teclado: Esc cierra y las flechas pasan de página.
  // El return quita el listener cuando se cierra el visor, si no se quedaría escuchando.
  // No lleva array de dependencias, así siempre usa el numPages y el onClose actuales.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') changePage(-1);
      if (event.key === 'ArrowRight') changePage(1);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Cerrar solo al hacer clic en el fondo oscuro, no dentro del visor
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-overlay animate-fade-in" onClick={handleBackdropClick}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-label={file.name}>
        <div className="modal-header">
          <h3 className="modal-title">{file.name}</h3>
          <div className="modal-controls">
            <button type="button" className="icon-btn" onClick={() => changeZoom(-ZOOM_STEP)} title="Zoom Out">
              <ZoomOut size={20} />
            </button>
            <span className="zoom-level">{Math.round(scale * 100)}%</span>
            <button type="button" className="icon-btn" onClick={() => changeZoom(ZOOM_STEP)} title="Zoom In">
              <ZoomIn size={20} />
            </button>
            <div className="divider" />
            <button type="button" className="icon-btn" onClick={onClose} title="Close (Esc)">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          <ErrorBoundary fallback={<div className="loading-spinner">Could not display this PDF</div>}>
            <Document
              file={file}
              onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
              loading={<div className="loading-spinner">Loading PDF...</div>}
              error={<div className="loading-spinner">Could not open this PDF</div>}
            >
              <Page pageNumber={pageNumber} scale={scale} />
            </Document>
          </ErrorBoundary>
        </div>

        {numPages && (
          <div className="modal-footer">
            <button type="button" className="nav-btn" disabled={pageNumber <= 1} onClick={() => changePage(-1)}>
              <ChevronLeft size={20} />
              Previous
            </button>
            <span className="page-indicator">
              Page {pageNumber} of {numPages}
            </span>
            <button type="button" className="nav-btn" disabled={pageNumber >= numPages} onClick={() => changePage(1)}>
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PDFViewerModal;
