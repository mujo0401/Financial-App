import React from 'react';
import { StyledTable, StyledTr, StyledTd, StyledTh } from 'components/assets/localStyle';

const TransactionTableForm = ({ transactionsData }) => {
  const renderTransactionsTable = () => {
    return (
      <StyledTable>
        <thead>
          <StyledTr>
            <StyledTh>Category</StyledTh>
            <StyledTh>Description</StyledTh>
            <StyledTh>Amount</StyledTh>
            <StyledTh>Date</StyledTh>
          </StyledTr>
        </thead>
        <tbody>
          {transactionsData && transactionsData.map((transaction, index) => (
            <StyledTr key={index}>
              <StyledTd>{transaction.category}</StyledTd>
              <StyledTd>{transaction.description}</StyledTd>
              <StyledTd>{transaction.amount}</StyledTd>
              <StyledTd>{transaction.date}</StyledTd>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    );
  };

  return renderTransactionsTable();
};

export default TransactionTableForm;