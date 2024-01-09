const FILE_URL = 'http://localhost:3000/api/files'; 

const TransactionImportService = {
 getFileByHash: async (hash) => {
    try {
        const response = await fetch(`${FILE_URL}/${hash}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error retrieving file hash:', error);
        throw error;
    }
 },

 importFiles: async (files) => {
    const formData = new FormData();
    for (const file of files) {
        formData.append('files', file);
    }

    try {
        const response = await fetch(`${FILE_URL}/transactionImport`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error importing files:', error);
        throw error;
    }
 },

 deleteFileByHash: async (hash) => {
    try {
        const response = await fetch(`${FILE_URL}/delete/${hash}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
 },

 readFileAsArrayBuffer: (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
 },

 generateSHA256Hash: async (file) => {
    const arrayBuffer = await TransactionImportService.readFileAsArrayBuffer(file); // Use this method to read file content
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); 
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
}
};

export default TransactionImportService;