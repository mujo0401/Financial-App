import React from 'react';

const TransactionPreviewForm = ({ transaction }) => (
  <div>
    <h2>Transaction Preview</h2>
    <p>Date: {transaction.date || 'Not selected'}</p>
    <p>Amount: {transaction.amount || 'Not entered'}</p>
    <p>Category: {transaction.category || 'Not selected'}</p>
    <p>Description: {transaction.description || 'Not entered'}</p>
  </div>
);

export default TransactionPreviewForm;