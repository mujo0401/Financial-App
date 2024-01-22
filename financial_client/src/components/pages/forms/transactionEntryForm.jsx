import React, { useState, useEffect } from 'react';
import CategoryForm from 'components/pages/forms/subforms/categoryForm';
import DescriptionForm from 'components/pages/forms/subforms/descriptionForm';
import AmountForm from 'components/pages/forms/subforms/amountForm';
import transactionEntryService from 'components/services/transactionEntryService';
import TransactionPreviewForm from 'components/pages/forms/subforms/transactionPreviewForm';
import categoryService from 'components/services/categoryService';
import descriptionService from 'components/services/descriptionService';
import MessageForm from './subforms/MessageForm';
import messageService from 'components/services/messageService';

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
  const [Message, setMessage] = useState('');
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


  const onAmountChange = (amount) => {
    setCurrentTransaction(prev => ({ ...prev, amount }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if amount is null
    if (!currentTransaction.amount) {
      // Fetch error message from messageService
      const response = await messageService.getMessage('Amount_Error');
      const message = response.messageName;
      setMessage(message);
      setMessageType('error');
      return;
    }

    if (!currentTransaction.categoryId) {
      // Fetch error message from messageService
      const response = await messageService.getMessage('Category_Error');
      const message = response.messageName;
      setMessage(message);
      setMessageType('error');
      return;
    }
    
    if (!currentTransaction.descriptionId) {
      // Fetch error message from messageService
      const response = await messageService.getMessage('Description_Error');
      const message = response.messageName;
      setMessage(message);
      setMessageType('error');
      return;
    }
  
    try {
      const response = await transactionEntryService.addTransaction(currentTransaction);
      console.log('Server response:', response); // Add this line
  
      if (response.messageType) {
        const messageResponse = await messageService.getMessage(response.messageType);
        const message = messageResponse.messageName;
        setMessage(message);
        setMessageType(response.messageType);
      }

      if (response.success) {
        // Fetch success message from messageService
        const successResponse = await messageService.getMessage('Success');
        const successMessage = successResponse.messageName;
        setMessage(successMessage);
        setMessageType('success');
      }

      if (response.error) {
        // Fetch error message from messageService
        const errorResponse = await messageService.getMessage('Error');
        const errorMessage = errorResponse.messageName;
        setMessage(errorMessage);
        setMessageType('error');
      }
      
    } catch (error) {
      console.error(error);
      setMessage('An error occurred');
      setMessageType('error');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <AmountForm onAmountChange={onAmountChange} />
      <CategoryForm 
        setSelectedCategoryName={setSelectedCategoryName}
        onCategoryChange={(categoryId) => setCurrentTransaction(prev => ({ ...prev, categoryId }))} 
      />
      <DescriptionForm 
        selectedCategoryName={selectedCategoryName} 
        onDescriptionChange={(descriptionId) => {
          setCurrentTransaction(prev => ({ ...prev, descriptionId }));
        }}
      />
      <MessageForm message={Message} messageType={messageType} />
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
  )};

export default TransactionEntryForm