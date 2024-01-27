import React from 'react';
import { ButtonContainer } from 'components/assets/buttonAssets';
import { TranTable } from 'components/assets/tableAssets';
import ClearTransactionForm from 'components/pages/forms/subforms/clearTransactionForm';
import AddTransactionForm from 'components/pages/forms/subforms/addTransactionForm';

const TransactionPreviewForm = ({ date, amount, category, description, onSubmit, onReset }) => {
  return (
    <TranTable>
      <div className="transaction-preview">
        <div><strong>Date:</strong> {date}</div>
        <div><strong>Amount:</strong> {amount}</div>
        <div><strong>Category:</strong> {category}</div>
        <div><strong>Description:</strong> {description}</div>
      </div>
      <div style={ButtonContainer}>
        <AddTransactionForm onSubmit={onSubmit} />
        <ClearTransactionForm onReset={onReset} />
      </div>
    </TranTable>
  );
};

export default TransactionPreviewForm;