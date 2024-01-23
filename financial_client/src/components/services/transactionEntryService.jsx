const TRANSACTION_URL = 'http://localhost:3000/api/transactions'; 

const transactionEntryService = {
  addTransaction: async (transactionData) => {
    try {
      console.log('Transaction data:', transactionData);

      const controller = new AbortController();
      const { signal } = controller;

      setTimeout(() => controller.abort(), 5000); // 5000 ms timeout

      const response = await fetch(TRANSACTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData),
        signal
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const responseBody = await response.json();

      if (responseBody.result === 'success') {
        console.log('Transaction successfully added:', responseBody);
        return responseBody;
        
      } else {
        console.error('Failed to add transaction:', responseBody);
        throw new Error('Failed to add transaction');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Fetch aborted');
        // Handle fetch abort here
      } else if (error instanceof TypeError) {
        console.error('Network Error or CORS issue:', error.message);
      } else {
        console.error('Other Error:', error.message);
      }
    
      return [];
    }
  }
};

export default transactionEntryService;