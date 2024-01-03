import React, { useState } from 'react';
import { Button } from 'components/assets/localStyle';
import DateForm from 'components/pages/forms/dateForm';
import CategoryForm from 'components/pages/forms/categoryForm';
import DescriptionForm from 'components/pages/forms/descriptionForm';
import AmountForm from 'components/pages/forms/amountForm';
import transactionEntryService from 'components/services/transactionEntryService';

const TransactionEntryForm = () => {
  const [selectedCategories] = useState([]);
  const [filteredDescriptions] = useState([]);
  const [transaction] = useState({ amount: '', date: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      categories: selectedCategories,
      descriptions: filteredDescriptions,
      amount: transaction.amount,
      date: transaction.date,
    };

    try {
      await transactionEntryService.addTransaction(transactionData);
      setMessage('Transaction successfully added!');
      setMessageType('success');
      // Reset form state if needed
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setMessage('Failed to add transaction.');
      setMessageType('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <DateForm />
    <CategoryForm />
    <DescriptionForm />
    <AmountForm />
      {message && (
        <div style={{ color: messageType === 'error' ? 'red' : 'green' }}>
          {message}
        </div>
      )}
      <Button type="submit">Add Transaction</Button>
    </form>
  );
};

export default TransactionEntryForm;
