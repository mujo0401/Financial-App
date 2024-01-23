import React from 'react';
import { ClearButton } from 'components/assets/buttonAssets';

const ClearTransactionForm = ({ onReset }) => {
  return (
    <ClearButton onClick={onReset}>
      Reset 
    </ClearButton>
  );
};

export default ClearTransactionForm;