import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import './PDFViewerModal.css';

const PDFViewerModal = ({ file, onClose }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const changePage = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    };

    const previousPage = () => changePage(-1);
    const nextPage = () => changePage(1);

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

    if (!file) return null;

    return (
        <div className="modal-overlay animate-fade-in" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{file.name}</h3>
                    <div className="modal-controls">
                        <button className="icon-btn" onClick={handleZoomOut} title="Zoom Out">
                            <ZoomOut size={20} />
                        </button>
                        <span className="zoom-level">{Math.round(scale * 100)}%</span>
                        <button className="icon-btn" onClick={handleZoomIn} title="Zoom In">
                            <ZoomIn size={20} />
                        </button>
                        <div className="divider"></div>
                        <button className="icon-btn" onClick={onClose} title="Close">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="modal-body">
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<div className="loading-spinner">Loading PDF...</div>}
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                        />
                    </Document>
                </div>

                {numPages && (
                    <div className="modal-footer">
                        <button
                            className="nav-btn"
                            disabled={pageNumber <= 1}
                            onClick={previousPage}
                        >
                            <ChevronLeft size={20} />
                            Previous
                        </button>
                        <span className="page-indicator">
                            Page {pageNumber} of {numPages}
                        </span>
                        <button
                            className="nav-btn"
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}
                        >
                            Next
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDFViewerModal;
