import React, { useState } from 'react';
import FileDropForm from 'components/pages/forms/low/fileDropForm';
import FileService from 'components/services/fileService';
import MessageForm from 'components/pages/forms/mid/MessageForm';
import FilePreviewForm from 'components/pages/forms/low/filePreviewForm';
import messageService from 'components/services/messageService';

const handleDuplicateError = (response, duplicateFiles) => {
  duplicateFiles.push(response);
};

const handleFileSuccess = (response, successfulFiles) => {
  successfulFiles.push(response);
};

const handleDeleteError = (response, deleteFail) => {
  deleteFail.push(response);
};

const handleDeleteSuccess = (response, deleteSuccess) => {
  deleteSuccess.push(response);
};

const TransactionImportForm = () => {
  const [files] = useState([]);
  const [Message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleFilesAdded = async (newFiles) => {
    try {
      const responses = await FileService.addFile(newFiles);
      let duplicateFiles = [];
      let successfulFiles = [];

      for (const response of responses) {
        if (response.messageType === 'Duplication_Error') {
          handleDuplicateError(response, duplicateFiles);
        } else if (response.messageType === 'File_Success') {
          handleFileSuccess(response, successfulFiles);
        }
      }

      if (duplicateFiles.length > 0) {
        const messageResponse = await messageService.getMessage('Duplication_Error');
        const message = messageResponse.messageName;
        setMessage(message);
        setMessageType('duplication');
        return;
      }

      if (successfulFiles.length > 0) {
        const messageResponse = await messageService.getMessage('File_Success');
        const message = messageResponse.messageName;
        setMessage(message);
        setMessageType('success');
        return;
      }

    } catch (error) {
      const response = await messageService.getMessage('Server_Error');
      const message = response.messageName;
      setMessage(message);
      setMessageType('error');
    }
  };

  const handleDeleteFile = async (fileIndex) => {
    try {
      const responses =  await FileService.deleteFile(fileIndex);
      let deleteSuccess = [];
      let deleteFail = [];
  
      for (const response of responses) {
        if (response.messageType === 'Delete_Error') {
          handleDeleteError(response, deleteFail);
        } else if (response.messageType === 'Delete_Success') {
          handleDeleteSuccess(response, deleteSuccess);
        }
      }
  
      if (deleteFail.length > 0) {
        const messageResponse = await messageService.getMessage('Delete_Error');
        const message = messageResponse.messageName;
        setMessage(message);
        setMessageType('deleteFail');
      }
  
      if (deleteSuccess.length > 0) {
        const messageResponse = await messageService.getMessage('Delete_Success');
        const message = messageResponse.messageName;
        setMessage(message);
        setMessageType('deleteSuccess');
      }

    } catch (error) {
      const response = await messageService.getMessage('Server_Error');
      const message = response.messageName;
      setMessage(message);
      setMessageType('error');
    }
  }; 
  
  return (
    <div>
      <FileDropForm onFilesAdded={handleFilesAdded} />
      <MessageForm message={Message} messageType={messageType} />
      {files.length > 0 && (
        <FilePreviewForm files={files} handleDeleteFile={handleDeleteFile} />
      )}
    </div>
  );
};
  
export default TransactionImportForm;