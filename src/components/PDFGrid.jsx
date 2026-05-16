import React from 'react';
import PDFThumbnail from './PDFThumbnail';
import './PDFGrid.css';

const PDFGrid = ({ files, onThumbnailClick }) => {
    if (!files || files.length === 0) {
        return null;
    }

    return (
        <div className="pdf-grid">
            {files.map((file, index) => (
                <PDFThumbnail
                    key={`${file.name}-${index}`}
                    file={file}
                    onClick={onThumbnailClick}
                />
            ))}
        </div>
    );
};

export default PDFGrid;
