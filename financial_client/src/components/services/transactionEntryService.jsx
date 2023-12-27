const TRANSACTION_URL = 'http://localhost:3000/api/transactions'; 

const transactionEntryService = {
  addTransaction: async (transactionData) => {
    try {
      const response = await fetch(TRANSACTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding transactions:', error);

      // Handle non-HTTP errors
      if (error instanceof TypeError) {
        console.error('Network Error or CORS issue:', error.message);
      } else {
        console.error('Other Error:', error.message);
      }

      return [];
    }
  }
};

export default transactionEntryService;
