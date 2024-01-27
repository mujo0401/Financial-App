import React from 'react';
import { ClearButton } from 'components/assets/buttonAssets';

const ClearTransactionForm = ({ onReset }) => {
  return (
    <ClearButton onClick={onReset} style={{ marginTop: '20px' }}>
      Reset 
    </ClearButton>
  );
};

export default ClearTransactionForm;