import PDFThumbnail from './PDFThumbnail';
import './PDFGrid.css';

function PDFGrid({ files, onSelect }) {
  return (
    <div className="pdf-grid">
      {files.map((file, index) => (
        // El nombre solo no sirve como key: dos carpetas pueden tener un PDF con el mismo nombre.
        // El índice es estable porque los archivos solo se añaden al final, nunca se reordenan.
        <PDFThumbnail key={`${file.name}-${index}`} file={file} onClick={() => onSelect(file)} />
      ))}
    </div>
  );
}

export default PDFGrid;
