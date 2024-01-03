import React, { useState, useEffect } from 'react';
import descriptionService from 'components/services/descriptionService'; 

const DescriptionForm = () => {
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    const fetchDescriptions = async () => {
      const fetchedDescriptions = await descriptionService.getDescriptions();
      setDescriptions(fetchedDescriptions);
    };

    fetchDescriptions();
  }, []);

  return (
    <div>
      {descriptions.map(description => (
        <div key={description.id}>
          {description.name}
        </div>
      ))}
    </div>
  );
};

export default DescriptionForm;