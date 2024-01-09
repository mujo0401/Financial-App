import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import TransactionImportService from 'components/services/transactionImportService';
import moment from 'moment';

const FileDrop = ({ onFilesAdded }) => {
  const [fileHashes, setFileHashes] = useState(new Set());
  const [hash, setHash] = useState(null);
  const [fileData, setFileData] = useState(null); 

  const onDrop = useCallback(async (acceptedFiles) => {
    let newHashes = new Set(fileHashes);
    const newFiles = [];
    const duplicates = [];
    const newActualFiles = [];
  
    for (const file of acceptedFiles) {
      // Read the file content
     
      
      // Generate SHA256 hash for the file and get file data by hash
      const fileHash = await TransactionImportService.generateSHA256Hash(file);
      const fetchedFileData = await TransactionImportService.getFileByHash(fileHash);
  
      // Set hash and file data
      setHash(fileHash);
      setFileData(fetchedFileData);
  
      if (!newHashes.has(fileHash)) {
        setFileHashes(prevHashes => new Set([...prevHashes, fileHash]));
        const fileInfo = {
          name: file.name,
          timestamp: moment(file.lastModified).format('YYYY-MM-DD HH:mm:ss'),
          hash: fileHash,
        };
        newActualFiles.push(file);
        newFiles.push(fileInfo);
      } else {
        duplicates.push(file.name);
      }
    }
  
    setFileHashes(newHashes);
    onFilesAdded(newFiles, newActualFiles, duplicates);
  }, [fileHashes, onFilesAdded]);
  // Function to read file content
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Convert ArrayBuffer to Base64 string
        let binary = '';
        const bytes = new Uint8Array(event.target.result);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        resolve(window.btoa(binary));
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };
  

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default FileDrop;
