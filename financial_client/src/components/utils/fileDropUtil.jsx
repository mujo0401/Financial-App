import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import FileService from 'components/services/fileService';

const FileDrop = ({ onFilesAdded }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      // Call the importFiles function with the array of files
      const response = await FileService.addFile(acceptedFiles);

      // Call the callback function with the response
      onFilesAdded(response);
    } catch (error) {
      console.error('Error adding files:', error);
    }
  }, [onFilesAdded]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default FileDrop;