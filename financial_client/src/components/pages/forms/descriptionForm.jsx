import React, { useState, useEffect } from 'react';
import { iconStyle } from 'components/assets/localStyle';
import descriptionService from 'components/services/descriptionService'; 
import mappingService from 'components/services/mappingService';

const DescriptionForm = ({ onDescriptionChange, selectedCategory }) => {
  const [descriptions, setDescriptions] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [categoryToDescriptionMap, setCategoryToDescriptionMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDescriptions = await descriptionService.getDescriptions();
      const mappingData = await mappingService.getCategoryFromDescription();
      if (Array.isArray(fetchedDescriptions)) {
        setDescriptions(fetchedDescriptions);
      } else {
        console.error('fetchedDescriptions is not an array:', fetchedDescriptions);
        setDescriptions([]);
      }
      setCategoryToDescriptionMap(mappingData);
    };
  
    fetchData();
  }, []);

  const filteredDescriptions = selectedCategory 
    ? descriptions.filter(desc => categoryToDescriptionMap[selectedCategory]?.includes(desc.name))
    : descriptions;

    const handleDescriptionClick = (description) => {
      const isSameDescription = selectedDescription === description.name;
      setSelectedDescription(isSameDescription ? null : description.name);
    
      if (typeof onDescriptionChange === 'function') {
        onDescriptionChange(isSameDescription ? '' : description.name);
      }
    };
    

  const getDescriptionStyle = (descriptionName) => {
    if (selectedDescription === descriptionName) {
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
             style={getDescriptionStyle(description.name)}
             onClick={() => handleDescriptionClick(description)}>
          {description.name}
        </div>
      ))}
    </div>
  );
};

export default DescriptionForm;
