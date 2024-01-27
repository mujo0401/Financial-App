import React from 'react';
import { Button } from 'components/assets/buttonAssets';

const AddTransactionForm = ({ onSubmit }) => {
  return (
    <Button type="submit" onClick={onSubmit} style={{ marginTop: '20px' }}>
      Add Transaction
    </Button>
  );
};

export default AddTransactionForm;