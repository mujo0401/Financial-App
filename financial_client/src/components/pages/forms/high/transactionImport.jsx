// transactionUpload.jsx
import React from 'react';
import TransactionImportForm from 'components/pages/forms/high/transactionImportForm'; 
import { Container } from '@mui/material';
import ErrorBoundary from 'components/pages/forms/low/errorForm';


const TransactionImport = () => {
  return (
    <ErrorBoundary>
    <Container>
      <h1>Upload Your Files (Multiple Transaction Entries)</h1>
      <TransactionImportForm />
    </Container>
    </ ErrorBoundary>
  );
};

export default TransactionImport;
