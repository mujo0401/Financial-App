import { useState } from 'react';
import TransactionImportService from 'components/services/transactionImportService';

const FileHandler = ({ file }) => {
    const [hash, setHash] = useState(null);
    const [fileData, setFileData] = useState(null); 

    const processFile = async () => {
        try {
            const fileHash = await TransactionImportService.generateSHA256Hash(file);
            const fetchedFileData = await TransactionImportService.getFileByHash(fileHash);
            setHash(fileHash);
            setFileData(fetchedFileData);
        } catch (error) {
            console.error('Failed to process file:', error);
        }
    };

    const deleteFile = async () => {
        if (hash) {
            try {
                await TransactionImportService.deleteFileByHash(hash);
                setHash(null);
                setFileData(null); 
            } catch (error) {
                console.error('Failed to delete file:', error);
            }
        }
    };

    const renderFileData = () => (
        <div>
            {fileData && (
                <div>
                    <h3>File Information:</h3>
                    <p>Name: {fileData.name}</p>
                    <p>Size: {fileData.size} bytes</p>
        
                </div>
            )}          
        </div>
    );
    return { processFile, deleteFile, renderFileData };
};

export default FileHandler;