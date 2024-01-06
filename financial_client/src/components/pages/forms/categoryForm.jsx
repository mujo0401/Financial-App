import React, { useState, useEffect } from 'react';
import { iconStyle } from 'components/assets/localStyle';
import categoryService from 'components/services/categoryService'; 

const CategoryForm = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    const isSameCategory = selectedCategory === category.name;
    setSelectedCategory(isSameCategory ? null : category.name);
    onCategoryChange(isSameCategory ? null : category.name); 
  };

  const getCategoryStyle = (categoryName) => {
    if (selectedCategory === categoryName) {
      return { ...iconStyle, backgroundColor: 'lightblue' }; 
    }
    return iconStyle;
  };

  const renderCategories = () => {
    return (
      <div className="categories-container">
        <h2>Transaction Buckets</h2>
        {categories.map((category) => (
          <div key={category.id} 
               style={getCategoryStyle(category.name)} 
               onClick={() => handleCategoryClick(category)}>
            {category.name}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderCategories()}
    </div>
  );
};

export default CategoryForm;
