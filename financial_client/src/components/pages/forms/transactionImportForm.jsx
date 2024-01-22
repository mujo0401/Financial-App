import React, { useState } from 'react';
import FileDropForm from 'components/pages/forms/subforms/fileDropForm';
import FileService from 'components/services/fileService';
import ErrorDialogForm from 'components/pages/forms/subforms/errorDialogForm';
import MessageForm from 'components/pages/forms/subforms/MessageForm';
import FilePreviewForm from 'components/pages/forms/subforms/filePreviewForm';
import messageService from 'components/services/messageService';

const TransactionImportForm = () => {
  const [files, setFiles] = useState([]);
  const [Message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFilesAdded = async (newFiles) => {
    try {
      const responses = await FileService.addFile(newFiles);
      let duplicateFiles = [];
      let successfulFiles = [];
  
      for (const response of responses) {
        if (response.messageType === 'Duplication_Error') {
          duplicateFiles.push(response);
        } else if (response.messageType === 'File_Success') {
          successfulFiles.push(response);
        }
      }
  
      if (duplicateFiles.length > 0) {
        const messageResponse = await messageService.getMessage('Duplication_Error');
        const message = messageResponse.messageName;
        setMessage(message);
        setMessageType('duplication');
      } else if (successfulFiles.length === 0) {
        const messageResponse = await messageService.getMessage('File_Success');
        const message = messageResponse.messageName;
        setMessage(message);
        setMessageType('success');
      }
    } catch (error) {
      setErrorMessage(error.response.data.error.errorMessage);
    }
  };

  const handleDeleteFile = async (fileIndex) => {
    try {
      const responses =  await FileService.deleteFile(fileIndex);
      let deleteSuccess = [];
      let deleteFail = [];
  
      for (const response of responses) {
        if (response.messageType === 'Delete_Error') {
          deleteFail.push(response);
        } else if (response.messageType === 'Delete_Success') {
          deleteSuccess.push(response);
        }
      }
  
      if (deleteFail.length > 0) {
        const messageResponse = await messageService.getMessage('Delete_Error');
        const message = messageResponse.messageName;
        setMessage(message);
        setMessageType('deleteFail');
      } else if (deleteSuccess.length > 0) {
        const messageResponse = await messageService.getMessage('Delete_Success');
        const message = messageResponse.messageName;
        setMessage(message);
        setMessageType('deleteSuccess');
      }
    } catch (error) {
      setErrorMessage(error.response.data.error.errorMessage);
      setIsErrorDialogOpen(true); 
    }
  };

  return (
    <div>
    <FileDropForm onFilesAdded={handleFilesAdded} />
            <MessageForm message={Message} messageType={messageType} />
        {files.length > 0 && (
<div className="file-preview">
     <FilePreviewForm files={files} handleDeleteFile={handleDeleteFile} />
            </div>
        )}
    </div>
  );
};

export default TransactionImportForm;