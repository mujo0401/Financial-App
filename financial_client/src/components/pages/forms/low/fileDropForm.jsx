import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import FileService from 'components/services/fileService';
import { DropzoneStyles, ActiveDropzone } from 'components/assets/generalStyle';

const FileDropForm = ({ onFilesAdded }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const response = await FileService.addFile(acceptedFiles);
      onFilesAdded(response);
    } catch (error) {
      console.error('Error adding files:', error);
    }
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const DropzoneComponent = isDragActive ? ActiveDropzone : DropzoneStyles;

  return (
    <DropzoneComponent {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </DropzoneComponent>
  );
};

export default FileDropForm;