import React, { useState, useEffect } from 'react';
import { iconStyle } from 'components/assets/iconAssets';
import categoryService from 'components/services/categoryService'; 

const CategoryForm = ({ onCategoryChange, reset }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (reset) {
      setSelectedCategoryId(null);
    }
  }, [reset]);

  const handleCategoryClick = (category) => {
    const isSameCategory = selectedCategoryId === category.id;
    setSelectedCategoryId(isSameCategory ? null : category.id);
    onCategoryChange(isSameCategory ? null : category.id); 
  };

  const getCategoryStyle = (categoryId) => {
    if (selectedCategoryId === categoryId) {
      return { ...iconStyle, backgroundColor: 'lightblue' }; 
    }
    return iconStyle;
  };

  const renderCategories = () => {
    return (
      <div className="categories-container">
        <h2>Transaction Categories</h2>
        {categories.map((category) => (
          <div key={category.id} 
               style={getCategoryStyle(category.id)} 
               onClick={() => handleCategoryClick(category)}>
            {category.name}
          </div>
        ))}
      </div>
    );
  };

  return renderCategories();
};

export default CategoryForm;