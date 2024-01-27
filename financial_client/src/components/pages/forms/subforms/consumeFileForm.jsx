import React from 'react';
import { Button } from 'components/assets/buttonAssets';

const ConsumeFileForm = ({ onSubmit }) => {
  return (
    <Button type="submit" onClick={onSubmit} style={{ marginTop: '20px' }}>
      Cosume File
    </Button>
  );
};

export default ConsumeFileForm;