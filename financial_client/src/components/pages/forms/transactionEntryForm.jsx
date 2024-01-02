import React, { useState, useEffect } from 'react';
import { Label, Input, Button } from 'components/assets/localStyle';
import categoryService from 'components/services/categoryService'; 
import descriptionService from 'components/services/descriptionService'; 
import transactionEntryService from 'components/services/transactionEntryService';

const TransactionEntryForm = () => {
  const [categories, setCategories] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [categoryKeywords, setCategoryKeywords] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredDescriptions, setFilteredDescriptions] = useState([]);
  const [transaction, setTransaction] = useState({ amount: '', date: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await categoryService.getCategories();
        const fetchedDescriptions = await descriptionService.getDescriptions();
        setCategories(fetchedCategories);
        setDescriptions(fetchedDescriptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategories(prev => [...prev, category]);
    // Filter descriptions based on selected categories
    const descriptions = categories.reduce((acc, cat) => {
        if (selectedCategories.includes(cat)) {
            return acc.concat(categoryKeywords[cat]);
        }
        return acc;
    }, []);
    setFilteredDescriptions(descriptions);
  };

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

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
      <Label htmlFor="date">Select Date</Label>
      <Input
        type="date"
        name="date"
        value={transaction.date}
        onChange={handleChange}
        required
      />

      <div className="categories-grid">
        <Label>Categories</Label>
        {categories.map(category => (
          <Button 
            key={category} 
            onClick={() => handleCategoryClick(category)} 
            className={selectedCategories.includes(category) ? 'selected' : ''}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="descriptions-grid">
        <Label>Descriptions</Label>
        {filteredDescriptions.map(description => (
          <div key={description}>{description}</div>
        ))}
      </div>

      <Label htmlFor="amount">Amount</Label>
      <Input
        type="number"
        name="amount"
        value={transaction.amount}
        onChange={handleChange}
        required
      />

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
