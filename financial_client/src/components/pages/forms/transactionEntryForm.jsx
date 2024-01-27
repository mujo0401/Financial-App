import React, { useState, useEffect } from 'react';
import CategoryForm from 'components/pages/forms/categoryForm';
import DescriptionForm from 'components/pages/forms/descriptionForm';
import AmountForm from 'components/pages/forms/amountForm';
import TransactionEntryService from 'components/services/transactionEntryService';
import TransactionPreviewForm from 'components/pages/forms/subforms/transactionPreviewForm';
import categoryService from 'components/services/categoryService';
import descriptionService from 'components/services/descriptionService';
import MessageForm from 'components/pages/forms/messageForm';
import MessageService from 'components/services/messageService';

const TransactionEntryForm = () => {
  const today = new Date().toISOString().split('T')[0];
  const initialTransactionState = {
    categoryId: '', 
    descriptionId: '', 
    amount: '',
    date: today
  };

  const [currentTransaction, setCurrentTransaction] = useState(initialTransactionState);
  const [transaction, setTransaction] = useState(initialTransactionState);

  const [categories, setCategories] = useState([]); 
  const [descriptions, setDescriptions] = useState([]); 
  const [Message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [reset, setReset] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!currentTransaction.amount) {
      const response = await MessageService.getMessage('Amount_Error');
      const message = response.messageName;
      setMessage(message);
      setMessageType('error');
      return;
    }

    if (!currentTransaction.categoryId) {
      const response = await MessageService.getMessage('Category_Error');
      const message = response.messageName;
      setMessage(message);
      setMessageType('error');
      return;
    }
    
    if (!currentTransaction.descriptionId) {
      const response = await MessageService.getMessage('Description_Error');
      const message = response.messageName;
      setMessage(message);
      setMessageType('error');
      return;
    }

    try {
      const response = await TransactionEntryService.addTransaction(currentTransaction);
      if (response.status === 200) {
        const successResponse = await MessageService.getMessage('Transaction_Success');
        const successMessage = successResponse.messageName;
        setMessage(successMessage);
        setMessageType('success');
        handleReset(); 
        setCurrentTransaction(initialTransactionState);
        const updatedTransactions = await TransactionEntryService.getTransactions();
        setTransaction(updatedTransactions);
        initialTransactionState(); //
      }

      if (response.status === 400) {
        const errorResponse = await MessageService.getMessage('Transaction_Error');
        const errorMessage = errorResponse.messageName;
        setMessage(errorMessage);
        setMessageType('error');
      }
    } catch (error) {
      const response = await MessageService.getMessage('Server_Error');
      const message = response.messageName;
      setMessage(message);
      setMessageType('error');
    }

    setMessage('');
    setMessageType('');
  }

  const resetMessages = () => {
    setMessage('');
    setMessageType('');
  };

  const handleReset = () => {
    setReset(true);
  };
  
  useEffect(() => {
    if (reset) {
      setTransaction(initialTransactionState);
      setReset(false);
    }
  }, [reset]);

  return (
    <form onSubmit={handleSubmit}>
        {Message && <MessageForm message={Message} messageType={messageType} />}
       <AmountForm 
  onAmountChange={(amount) => {
    setCurrentTransaction(prev => ({ ...prev, amount }));
    resetMessages(); // Reset the messages when the amount is changed
  }}     
      />
   <CategoryForm 
    setSelectedCategoryName={setSelectedCategoryName}
    onCategoryChange={(categoryId) => {
    setCurrentTransaction(prev => ({ ...prev, categoryId }));
    resetMessages(); // Reset the messages when a category is selected
     }}
    />
      <DescriptionForm 
        selectedCategoryName={selectedCategoryName} 
        onDescriptionChange={(descriptionId) => {
          setCurrentTransaction(prev => ({ ...prev, descriptionId }));
          resetMessages(); 
        }}
      />
     
      {currentTransaction && (
        <TransactionPreviewForm 
          date={currentTransaction.date}
          amount={currentTransaction.amount}
          category={categoryName} 
          description={descriptionName}
          onSubmit={handleSubmit} />
      )}
      
     {currentTransaction && (
    <TransactionPreviewForm 
    date={currentTransaction.date}
    amount={currentTransaction.amount}
    category={categoryName} 
    description={descriptionName}
    onReset={handleReset} />
      )}
    </form>
  )};

export default TransactionEntryForm