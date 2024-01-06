import React, { useState } from 'react';
import { Button } from 'components/assets/localStyle';
import DateForm from 'components/pages/forms/dateForm';
import CategoryForm from 'components/pages/forms/categoryForm';
import DescriptionForm from 'components/pages/forms/descriptionForm';
import AmountForm from 'components/pages/forms/amountForm';
import transactionEntryService from 'components/services/transactionEntryService';
import TransactionTableForm from 'components/pages/forms/transactionTableForm';

const TransactionEntryForm = () => {
  // State to hold the entire transaction
  const [currentTransaction, setCurrentTransaction] = useState({
    category: '',
    description: '',
    amount: '',
    date: ''
  });
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const onDescriptionChange = (descriptionName) => {
    setCurrentTransaction(prev => ({ ...prev, description: descriptionName }));
  }

  const onAmountChange = (amount) => {
    setCurrentTransaction(prev => ({ ...prev, amount: amount }));
  }

  const onDateChange = (date) => {
    setCurrentTransaction(prev => ({ ...prev, date: date }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new transaction object
    const newTransaction = { ...currentTransaction };
  
    // Add the new transaction to the transactions array
    const updatedTransactions = [...transactions, newTransaction];
  
    try {
      // Send the updated transactions array to the service
      await transactionEntryService.addTransaction(updatedTransactions);
  
      // If the service call was successful, update the state
      setTransactions(updatedTransactions);
      setCurrentTransaction({ category: '', description: '', amount: '', date: '' });
  
      setMessage('Transaction successfully added!');
      setMessageType('success');
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setMessage('Failed to add transaction.');
      setMessageType('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
     <DateForm onDateChange={onDateChange} />
      <AmountForm onAmountChange={onAmountChange} />
      <CategoryForm onCategoryChange={(category) => {
        setSelectedCategory(category);
        setCurrentTransaction(prev => ({ ...prev, category: category }));
      }} />
      <DescriptionForm selectedCategory={selectedCategory} onDescriptionChange={onDescriptionChange} />
      {message && (
        <div style={{ color: messageType === 'error' ? 'red' : 'green' }}>
          {message}
        </div>
      )}
      <Button type="submit" style={{ marginTop: '20px' }}>Add Transaction</Button>
      <div>
        <h2>Transaction Preview</h2>
        <TransactionTableForm transactionsData={transactions} />
      </div>
    </form>
  );
};

export default TransactionEntryForm;
