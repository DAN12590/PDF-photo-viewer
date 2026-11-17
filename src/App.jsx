import { useState } from 'react';
import { Files } from 'lucide-react';
import FileUploader from './components/FileUploader';
import PDFGrid from './components/PDFGrid';
import PDFViewerModal from './components/PDFViewerModal';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  // PDF abierto en el visor grande. null = visor cerrado
  const [selectedFile, setSelectedFile] = useState(null);

  // Los nuevos se añaden a los que ya había, no los sustituyen
  function addFiles(newFiles) {
    setFiles((current) => [...current, ...newFiles]);
  }

  const hasFiles = files.length > 0;

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <Files className="logo-icon" size={28} />
            <span>PDF Gallery</span>
          </div>
          {hasFiles && <span className="file-count">{files.length} files loaded</span>}
        </div>
      </header>

      <main className="container main-content">
        {hasFiles ? (
          <>
            <div className="toolbar">
              <h2>Your Collection</h2>
              <FileUploader onFilesSelected={addFiles} compact />
            </div>
            <PDFGrid files={files} onSelect={setSelectedFile} />
          </>
        ) : (
          <FileUploader onFilesSelected={addFiles} />
        )}
      </main>

      {selectedFile && (
        <PDFViewerModal file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
    </div>
  );
}

export default App;
