import React from 'react';
import { TransactionWidget, Button } from 'components/assets/localStyle';

const TransactionPreviewForm = ({ date, amount, category, description, onSubmit }) => {
    return (
        <TransactionWidget>
            <div className="transaction-preview">
                <div><strong>Date:</strong> {date}</div>
                <div><strong>Amount:</strong> {amount}</div>
                <div><strong>Category:</strong> {category}</div>
                <div><strong>Description:</strong> {description}</div>
            </div>
            <Button type="submit" onClick={onSubmit} style={{ marginTop: '20px' }}>
                Add Transaction
            </Button>
        </TransactionWidget>
    );
};

export default TransactionPreviewForm;
