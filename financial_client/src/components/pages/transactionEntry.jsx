import React from 'react';
import TransactionEntryForm from 'components/pages/forms/high/transactionEntryForm';
import { Container } from '@mui/material';
import ErrorBoundary from 'components/pages/forms/low/errorForm';



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
