const IMPORT_URL = 'http://localhost:3000/api/imports'; 



const TransactionImportService = {
importData: async (files) => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });

      const response = await fetch(IMPORT_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
};

export default TransactionImportService;