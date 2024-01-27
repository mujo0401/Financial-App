import React from 'react';
import TransactionEntryForm from 'components/pages/forms/transactionEntryForm';
import { Container } from '@mui/material';
import ErrorBoundary from 'components/pages/forms/subforms/errorForm';



const TransactionEntry = () => {
  return (
    <ErrorBoundary>
    <Container>
    <div>
      <h1>Single Transaction Entries</h1>
      <TransactionEntryForm />
    </div>
    </Container>
    </ ErrorBoundary>
  );
};

export default TransactionEntry;
