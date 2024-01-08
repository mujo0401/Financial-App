const FILE_URL = 'http://localhost:3000/api/files'; 

const getFileByHash = async (fileId) => {
    try {
        const response = await fetch(`${FILE_URL}/${fileId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error retrieving file hash:', error);
        throw error;
    }
};

const importFiles = async (files) => {
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
};

const deleteFileByHash = async (hash) => {
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
};

const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

const generateSHA256Hash = async (file) => {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); 
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); 
    return hashHex;
};

export { readFileAsArrayBuffer, generateSHA256Hash, deleteFileByHash, getFileByHash, importFiles };
