import React, { useState } from 'react';
import FileDrop from 'components/utils/fileDropUtil';
import DescriptionService from 'components/services/descriptionService';
import FileService from 'components/services/fileService';
import DuplicateFilesError from 'components/pages/forms/subforms/setDuplicationForm';
import AddDescriptionForm from 'components/pages/forms/subforms/addDescriptionForm'; 
import ErrorDialog from 'components/pages/forms/subforms/errorDialogForm';
import ImportMessage from 'components/pages/forms/subforms/importMessageForm';
import FilePreviewForm from 'components/pages/forms/subforms/filePreviewForm';
import { processButtonStyle } from 'components/assets/globalStyle';
import { Button } from '@mui/material';

const { addDescription } = DescriptionService;

const TransactionImportForm = () => {
  const [files, setFiles] = useState([]);
  const [duplicateFiles, setDuplicateFiles] = useState([]);
  const [unrecognizedDescriptions] = useState([]);
  const [importMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [tempFiles, setTempFiles] = useState([]);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const handleFilesAdded = async (newFiles) => {
    try {
        const response = await FileService.addFile(newFiles);

        // Process response for each file
        response.forEach(fileResponse => {
            if (fileResponse.duplicate) {
                setDuplicateFiles(currDuplicates => [...currDuplicates, fileResponse.name]);
            } else {
                setFiles(currFiles => [...currFiles, fileResponse]);
            }
        });
      } catch (error) {
        // Display the error message
        setErrorMessage(error.response.data.error);
        setIsErrorDialogOpen(true); 
    }
};

const handleCloseErrorDialog = () => {
    setIsErrorDialogOpen(false);
};

const handleProcessFiles = async () => {
  try {
      const response = await FileService.processFiles(tempFiles);
      setFiles(response.data); 
      setTempFiles([]); 
  } catch (error) {

  }
};

  const handleDeleteFile = async (fileIndex) => {
    try {
      await FileService.deleteFile(fileIndex);
      setTempFiles(currentFiles => currentFiles.filter((_, index) => index !== fileIndex));
    } catch (error) {
    }
  };

  const handleAddDescription = async (newDescription) => {
    try {
      await addDescription(newDescription);
      console.log('New Description Added:', newDescription);
    } catch (error) {
      console.error('Error adding new description:', error);

    }
  };
  
  return (
    <div>
    <FileDrop onFilesAdded={handleFilesAdded} />
    
            <ErrorDialog isOpen={isErrorDialogOpen} onClose={handleCloseErrorDialog} errorMessage={errorMessage} />
            <ImportMessage message={importMessage} />
            <DuplicateFilesError duplicateFiles={duplicateFiles} />
        {files.length > 0 && (
<div className="file-preview">
     <FilePreviewForm files={files} handleDeleteFile={handleDeleteFile} />
            </div>
        )}
        <Button 
            style={processButtonStyle} 
            onClick={handleProcessFiles}
            disabled={tempFiles.length === 0}
        >
            Process File(s)
        </Button>
        {unrecognizedDescriptions.length > 0 && (
            <AddDescriptionForm 
                onDescriptionAdded={handleAddDescription}
                descriptions={unrecognizedDescriptions}
            />
        )}
    </div>
  );
};

export default TransactionImportForm;