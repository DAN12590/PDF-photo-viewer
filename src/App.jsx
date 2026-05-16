import React, { useState } from 'react';
import { Files } from 'lucide-react';
import FileUploader from './components/FileUploader';
import PDFGrid from './components/PDFGrid';
import PDFViewerModal from './components/PDFViewerModal';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFilesSelected = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleThumbnailClick = (file) => {
    setSelectedFile(file);
  };

  const closeModal = () => {
    setSelectedFile(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <Files className="logo-icon" size={28} />
            <span>PDF Gallery</span>
          </div>
          <div className="header-actions">
            {files.length > 0 && (
              <span className="file-count">{files.length} files loaded</span>
            )}
          </div>
        </div>
      </header>

      <main className="container main-content">
        {files.length === 0 ? (
          <FileUploader onFilesSelected={handleFilesSelected} />
        ) : (
          <>
            <div className="toolbar">
              <h2>Your Collection</h2>
              <FileUploader onFilesSelected={handleFilesSelected} />
            </div>
            <PDFGrid files={files} onThumbnailClick={handleThumbnailClick} />
          </>
        )}
      </main>

      {selectedFile && (
        <PDFViewerModal file={selectedFile} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
