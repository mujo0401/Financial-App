import React, { useState } from 'react';
const [amountEntries, setAmountEntries] = useState([]);
const [date, setDate] = useState('');

const handleAddAmount = (amount) => {
    setAmountEntries(prev => [...prev, amount]);
};

// Render amounts
const renderAmounts = () => {
    return amountEntries.map((amount, index) => (
        <div key={index}>
            {amount}
        </div>
    ));
};

// Form to add amounts
const AmountForm = () => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddAmount(amount);
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
            />
            <button type="submit">Add Amount</button>
        </form>
    );
};
