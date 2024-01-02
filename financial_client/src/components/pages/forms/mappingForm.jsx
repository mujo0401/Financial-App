import React, { useState, useEffect } from 'react';

const CategoryMapping = () => {
  const [categoryMappings, setCategoryMappings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryMappings = async () => {
      try {
        const response = await fetch('/api/categoryMappings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategoryMappings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryMappings();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Category Mappings</h2>
      <ul>
        {Object.entries(categoryMappings).map(([category, descriptions]) => (
          <li key={category}>
            <strong>{category}:</strong> {descriptions.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMapping;
