import React from 'react';
import { TranTable } from 'components/assets/tableAssets';

const TransactionSummaryForm = ({ categoryId, descriptionId, amount }) => {
  return (
     <TranTable>
      <div className="transaction-preview">
            
      <h3>Transaction Summary</h3>
      <p>Category ID: {categoryId}</p>
      <p>Description ID: {descriptionId}</p>
      <p>Amount: {amount}</p>
    </div>
    </TranTable>
  );
};

export default TransactionSummaryForm;
