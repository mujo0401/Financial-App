const FILE_URL = 'http://localhost:3000/api/files'; 

const FileService = {
    
    addFile: async (files) => {
        if (!Array.isArray(files)) {
            console.error('Error: files is not an iterable');
            return [];
        }
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });
    
        try {
            const response = await fetch(FILE_URL, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                const errorBody = await response.json(); 
                const errorMessage = errorBody.error || 'Network response was not ok';
                throw new Error(errorMessage);
            }
            return [await response.json()];
        } catch (error) {
            console.error('Error importing files:', error);
            return [];
        }
    },
    deleteFile: async (hash) => {
        if (!hash) {
            console.error('Error: file hash is undefined');
            return;
        }

        try {
            const response = await fetch(`${FILE_URL}/delete/filename/${hash}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json(); 
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    },

    getFileName: async (hash) => {
        if (!hash) {
            console.error('Error: file hash is undefined');
            return;
        }

        try {
            const response = await fetch(`${FILE_URL}/filename/${hash}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.filename; 
        } catch (error) {
            console.error('Error getting filename:', error);
            throw error;
        }
    }
};

export default FileService;
