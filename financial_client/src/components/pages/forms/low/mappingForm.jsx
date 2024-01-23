import React, { useState, useEffect } from 'react';
import mappingService from 'components/services/mappingService'; 

const MappingForm = () => {
  const [categoryMappings, setCategoryMappings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryMappings = async () => {
      try {
        const data = await mappingService.fetchCategoryMappings(); 
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

export default MappingForm;
