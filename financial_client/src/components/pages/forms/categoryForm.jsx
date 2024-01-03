import React, { useState, useEffect } from 'react';
import categoryService from 'components/services/categoryService'; 
import DescriptionForm from 'components/pages/forms/descriptionForm';
import mappingForm from 'components/pages/forms/mappingForm';

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredDescriptions, setFilteredDescriptions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await categoryService.getCategories();
      setCategories(Object.keys(fetchedCategories));
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategories(prev => [...prev, category]);
    // Assuming mappingForm returns the related descriptions for the category
    const descriptions = mappingForm[category] || [];
    setFilteredDescriptions(descriptions);
  };

  const renderCategories = () => {
    return (
      <div className="categories-container">
        {categories.map((category, index) => (
          <div key={category} 
               className="category-icon" 
               onClick={() => handleCategoryClick(category)}
               style={{ display: 'inline-block', margin: 10 }}>
            {category}
          </div>
        ))}
      </div>
    );
  };

  const renderTransactionsTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Category</th>
   
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.category}</td>

            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {renderCategories()}
      <DescriptionForm descriptions={filteredDescriptions} />
      {renderTransactionsTable()}
    </div>
  );
};

export default CategoryForm;
