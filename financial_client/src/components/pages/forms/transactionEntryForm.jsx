import React, { useState, useEffect } from 'react';
import CategoryForm from 'components/pages/forms/categoryForm';
import DescriptionForm from 'components/pages/forms/descriptionForm';
import AmountForm from 'components/pages/forms/amountForm';
import transactionEntryService from 'components/services/transactionEntryService';
import TransactionPreviewForm from 'components/pages/forms/transactionPreviewForm';
import categoryService from 'components/services/categoryService';
import descriptionService from 'components/services/descriptionService';

const TransactionEntryForm = () => {

  const today = new Date().toISOString().split('T')[0];
  // State to hold the entire transaction
  const [currentTransaction, setCurrentTransaction] = useState({
    categoryId: '', 
    descriptionId: '', 
    amount: '',
    date: today
  });
  const [categories, setCategories] = useState([]); 
  const [descriptions, setDescriptions] = useState([]); 
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  useEffect(() => {
    const fetchCategoriesAndDescriptions = async () => {
      const fetchedCategories = await categoryService.getCategories();
      const fetchedDescriptions = await descriptionService.getDescriptions();
      setCategories(fetchedCategories);
      setDescriptions(fetchedDescriptions);
    };

    fetchCategoriesAndDescriptions();
  }, []);

  const categoryName = categories.find(c => c.id === currentTransaction.categoryId)?.name;
  const descriptionName = descriptions.find(d => d.id === currentTransaction.descriptionId)?.name;

  const onDescriptionChange = (descriptionId) => {
    setCurrentTransaction(prev => ({ ...prev, descriptionId }));
  }

  const onAmountChange = (amount) => {
    setCurrentTransaction(prev => ({ ...prev, amount }));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await transactionEntryService.addTransaction(currentTransaction);
      if (response.message) {
        setMessage(response.message);
        setMessageType('success');
      } else {
        setMessage('Transaction added, but no message received.');
      }
      setCurrentTransaction({ categoryId: '', descriptionId: '', amount: '', date: today });
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setMessage('Failed to add transaction.');
      setMessageType('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AmountForm onAmountChange={onAmountChange} />
      <CategoryForm 
        setSelectedCategoryName={setSelectedCategoryName}
      onCategoryChange={(categoryId) => setCurrentTransaction(prev => ({ ...prev, categoryId }))} />
      <DescriptionForm 
  selectedCategoryName={selectedCategoryName} // Pass the selected category name
  onDescriptionChange={(descriptionId) => {
    // Handle description change
    setCurrentTransaction(prev => ({ ...prev, descriptionId }));
  }}
/>
      {message && (
        <div style={{ color: messageType === 'error' ? 'red' : 'green' }}>
          {message}
        </div>
      )}
  {currentTransaction && (
    <TransactionPreviewForm 
      date={currentTransaction.date}
      amount={currentTransaction.amount}
      category={categoryName} 
      description={descriptionName}
      onSubmit={handleSubmit}
    />
  )}
    </form>
  );
};

export default TransactionEntryForm