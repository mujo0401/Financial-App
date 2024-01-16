const FILE_URL = 'http://localhost:3000/api/files'; 

const FileService = {
    addFile: async (files) => {
        const formData = new FormData();
        for (const file of files) {
            formData.append('files', file);
        }

        try {
            const response = await fetch(FILE_URL, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                console.error('Error status:', response.status, 'Status text:', response.statusText);
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error importing files:', error);
            throw error;
        }
    },

    deleteFile: async (hash) => {
        try {
            const response = await fetch(`${FILE_URL}/delete/${hash}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json(); // You might want to return the response here
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    },

};

export default FileService;
