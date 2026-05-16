import React, { useRef } from 'react';
import { Upload, FileUp, FolderUp } from 'lucide-react';
import './FileUploader.css';

const FileUploader = ({ onFilesSelected }) => {
    const fileInputRef = useRef(null);
    const folderInputRef = useRef(null);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            onFilesSelected(files);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="file-uploader animate-fade-in">
            <div className="uploader-content">
                <div className="icon-wrapper">
                    <FileUp size={48} />
                </div>
                <h2>Upload your PDF Collection</h2>
                <p>Select multiple PDF files to view them in a gallery.</p>
                <div className="button-group">
                    <button className="btn btn-primary" onClick={handleButtonClick}>
                        <Upload size={20} />
                        Select Files
                    </button>
                    <button className="btn btn-secondary" onClick={() => folderInputRef.current.click()}>
                        <FolderUp size={20} />
                        Select Folder
                    </button>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept="application/pdf"
                    style={{ display: 'none' }}
                />
                <input
                    type="file"
                    ref={folderInputRef}
                    onChange={handleFileChange}
                    webkitdirectory=""
                    directory=""
                    multiple
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
};

export default FileUploader;
