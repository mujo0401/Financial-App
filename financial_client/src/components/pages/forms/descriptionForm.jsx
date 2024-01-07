import React, { useState, useEffect } from 'react';
import { iconStyle } from 'components/assets/localStyle';
import descriptionService from 'components/services/descriptionService'; 
import mappingService from 'components/services/mappingService';

const DescriptionForm = ({ onDescriptionChange, selectedCategoryName }) => {
  const [descriptions, setDescriptions] = useState([]);
  const [selectedDescriptionId, setSelectedDescriptionId] = useState(null);
  const [categoryToDescriptionMap, setCategoryToDescriptionMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDescriptions = await descriptionService.getDescriptions();
      const mappingData = await mappingService.getCategoryFromDescription(); // Fetch mapping data
      setDescriptions(fetchedDescriptions);
      setCategoryToDescriptionMap(mappingData); // Set the mapping data
    };
  
    fetchData();
  }, []);

  const filteredDescriptions = selectedCategoryName 
    ? descriptions.filter(desc => {
        const keywords = categoryToDescriptionMap[selectedCategoryName] || [];
        return keywords.some(keyword => desc.name.includes(keyword));
      })
    : descriptions;

  const handleDescriptionClick = (description) => {
    const isSameDescription = selectedDescriptionId === description.id;
    setSelectedDescriptionId(isSameDescription ? null : description.id);
  
    if (typeof onDescriptionChange === 'function') {
      onDescriptionChange(isSameDescription ? '' : description.id); 
    }
  };

  const getDescriptionStyle = (descriptionId) => {
    if (selectedDescriptionId === descriptionId) {
      return { ...iconStyle, backgroundColor: 'lightblue' }; 
    }
    return iconStyle;
  };

  return (
    <div>
      <div className="descriptions-container"></div>
        <h2>Transaction Descriptions</h2> 
      {filteredDescriptions.map(description => (
        <div key={description.id} 
             style={getDescriptionStyle(description.id)} // Use ID for style
             onClick={() => handleDescriptionClick(description)}>
          {description.name}
        </div>
      ))}
    </div>
  );
};

export default DescriptionForm;