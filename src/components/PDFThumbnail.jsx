import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Maximize2 } from 'lucide-react';
import './PDFThumbnail.css';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const PDFThumbnail = ({ file, onClick }) => {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="pdf-thumbnail animate-fade-in" onClick={() => onClick(file)}>
            <div className="thumbnail-wrapper">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div className="loading-skeleton">Loading...</div>}
                    error={<div className="error-state">Failed to load PDF</div>}
                >
                    <Page
                        pageNumber={1}
                        width={250}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                </Document>
                <div className="overlay">
                    <Maximize2 size={24} />
                </div>
            </div>
            <div className="file-info">
                <span className="file-name" title={file.name}>{file.name}</span>
                {numPages && <span className="page-count">{numPages} pages</span>}
            </div>
        </div>
    );
};

export default PDFThumbnail;
