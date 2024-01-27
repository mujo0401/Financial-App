import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DropzoneStyles, ActiveDropzone } from 'components/assets/generalStyle';

const FileDropForm = ({ handleFileDrop }) => {
  const onDrop = useCallback((acceptedFiles) => {
    handleFileDrop(acceptedFiles);
  }, [handleFileDrop]);

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