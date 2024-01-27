import React, { useState } from 'react';
import FileDropForm from 'components/pages/forms/subforms/fileDropForm';
import FileService from 'components/services/fileService';
import MessageForm from 'components/pages/forms/messageForm';
import FilePreviewForm from 'components/pages/forms/subforms/filePreviewForm';
import MessageService from 'components/services/messageService';
import TransactionImportService from 'components/services/transactionImportService';
import TransactionSummaryForm from 'components/pages/forms/subforms/transactionSummaryForm';
import DuplicationForm from 'components/pages/forms/subforms/duplicationForm';

const createFileData = (file) => {
  return {
    filename: file.name,
    filesize: file.size,
    mediatype: file.type,
    encoding: '7bit', 
    isprocessed: false,
    importdate: new Date().toLocaleDateString(),

  };
};

const TransactionImportForm = () => {
  const [files, setFiles] = useState([]);
  const [duplicates, setDuplicates] = useState([]);
  const [successfulTransactions, setSuccessfulTransactions] = useState([]);
  const [Message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [previewFiles, setPreviewFiles] = useState([]);


  const handleFileDrop = async (files) => {
    try {
      if (!Array.isArray(files)) {
        console.error('Error: files is not an iterable');
        return;
      }
  
      const newFiles = await Promise.all(files.map(async (file) => {
        const fileData = createFileData(file);
        return { ...fileData, filename: file.name };
      }));
  
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setPreviewFiles(prevPreviewFiles => [...prevPreviewFiles, ...newFiles]); // Update previewFiles
    } catch (error) {
      console.error('Error handling file drop:', error);
    }
  };

  const handleFilesAdded = async (newFiles) => {
    try {
      let duplicateFiles = [...duplicates];
      let successfulFiles = [...files];
  
      const promises = newFiles.map(file => {
        if (!files.includes(file.name) && !duplicates.includes(file.name)) {
          return FileService.getFileName([file]);
        }
      }).filter(Boolean); 
  
      const responses = await Promise.all(promises);
  
      responses.forEach(({ file, response }) => {
        if (response && response.status === 200) {
          successfulFiles.push(file.name);
        } else if (response && response.status === 409) {
          duplicateFiles.push(file.name);
        }
      });
  
      setDuplicates(duplicateFiles);
      setFiles(successfulFiles);
  
      if (duplicateFiles.length > 0) {
        setMessage('Duplication Error');
        setMessageType('duplicate');
      } else if (successfulFiles.length > 0) {
        const importDataResponse = await TransactionImportService.importData(successfulFiles);
        setSuccessfulTransactions(importDataResponse);
        setMessage('File Import Successful');
        setMessageType('success');
      }
  
      // Render FilePreviewForm for each file
      successfulFiles.forEach(file => {
        setPreviewFiles(prevFiles => [...prevFiles, file]);
      });
  
    } catch (error) {
      console.error('Error importing files:', error);
    }
  };

  const handleDeleteFile = async (fileIndex) => {
    try {
      await FileService.deleteFile(files[fileIndex].name);
      setFiles(files.filter((_, index) => index !== fileIndex));
    } catch (error) {
      console.error('Error deleting file:', error);
      const messageResponse = await MessageService.getMessage('Server_Error');
      setMessage(messageResponse.messageName);
      setMessageType('error');
    }
  };

  const handleConsumeFiles = async () => {
    try {
      const filesToUpload = files.filter(file => file.messageType !== 'Duplication_Error');
      const responses = await Promise.all(filesToUpload.map(file => FileService.addFile(file)));
      const updatedFiles = files.map(file => {
        const response = responses.find(res => res.filename === file.filename);
        return response ? { ...file, messageType: response.messageType } : file;
      });
  
      setFiles(updatedFiles);

    } catch (error) {
      console.error('Error consuming files:', error);
    }
  };
  

  return (
    <div>
      <MessageForm message={Message} messageType={messageType} />
      <FileDropForm handleFileDrop={handleFileDrop} />
      {previewFiles.map(file => (
        <FilePreviewForm 
          key={file.filename} 
          file={file} 
          files={files} 
          handleDeleteFile={handleDeleteFile} 
          onConsumeFiles={handleConsumeFiles} 
          handleFileAdded={handleFilesAdded}
        />
      ))} 
      {duplicates.length > 0 && <DuplicationForm duplicates={duplicates} />}
      {successfulTransactions.length > 0 && (
        <TransactionSummaryForm transactions={successfulTransactions} />
      )}
    </div>
  );
};

export default TransactionImportForm;
