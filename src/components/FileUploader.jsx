import { useRef } from 'react';
import { Upload, FileUp, FolderUp } from 'lucide-react';
import './FileUploader.css';

// Al elegir una carpeta llegan todos sus archivos, así que hay que quedarse solo con los PDF
function isPdf(file) {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

// compact = solo los botones, para la barra de arriba cuando ya hay PDFs cargados
function FileUploader({ onFilesSelected, compact = false }) {
  // Los <input type="file"> están ocultos porque no se pueden estilar bien.
  // Los botones los "pulsan" a través de estas refs.
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  function handleChange(event) {
    const pdfs = Array.from(event.target.files).filter(isPdf);
    if (pdfs.length > 0) {
      onFilesSelected(pdfs);
    }
    // Si no se vacía, elegir otra vez los mismos archivos no dispara onChange
    event.target.value = '';
  }

  const controls = (
    <>
      <div className="button-group">
        <button type="button" className="btn btn-primary" onClick={() => fileInputRef.current.click()}>
          <Upload size={20} />
          Select Files
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => folderInputRef.current.click()}>
          <FolderUp size={20} />
          Select Folder
        </button>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleChange} accept="application/pdf" multiple hidden />
      {/* webkitdirectory hace que el diálogo elija una carpeta entera en vez de archivos */}
      <input type="file" ref={folderInputRef} onChange={handleChange} webkitdirectory="" multiple hidden />
    </>
  );

  if (compact) {
    return controls;
  }

  return (
    <div className="file-uploader animate-fade-in">
      <div className="uploader-content">
        <div className="icon-wrapper">
          <FileUp size={48} />
        </div>
        <h2>Upload your PDF Collection</h2>
        <p>Select multiple PDF files to view them in a gallery.</p>
        {controls}
      </div>
    </div>
  );
}

export default FileUploader;
