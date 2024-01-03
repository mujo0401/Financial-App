import React, { useState } from 'react';

const AmountForm = () => {
    const [amountEntries, setAmountEntries] = useState([]);

    const handleAddAmount = (amount) => {
        setAmountEntries(prev => [...prev, amount]);
    };

    const renderAmounts = () => {
        return amountEntries.map((amount, index) => (
            <div key={index}>
                {amount}
            </div>
        ));
    };

    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddAmount(amount);
        setAmount('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Add Amount</button>
            </form>
            {renderAmounts()}
        </div>
    );
};

export default AmountForm;