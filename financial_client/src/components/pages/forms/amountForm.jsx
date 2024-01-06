import React, { useState } from 'react';
import { Input, Label } from 'components/assets/localStyle';

const AmountForm = ({ onAmountChange }) => {
    const [amountEntries, setAmountEntries] = useState([]);

    const handleAmountChange = (event) => {
        onAmountChange(event.target.value);
      };

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

    const [amount, setAmount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddAmount(amount);
        onAmountChange(amount); 
        setAmount(0);
    };

    // Calculate color based on amount
    const color = amount < 5000 ? 'green' : amount < 7500 ? 'orange' : 'red';

    return (
        <div>
            <Label htmlFor="amount">Input Amount</Label>
            <form onSubmit={handleSubmit}>
                <Input
                    type="number"
                    min="0"
                    max="10000"
                    step="0.01"
                    value={amount}
                    onChange={e => {
                        setAmount(e.target.value);
                        handleAmountChange(e.target.value);
                      }}
                    required
                />
                <Input
                    type="range"
                    min="0"
                    max="10000"
                    step="0.01"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                    style={{ background: color }} // Apply color to slider
                />
                <span style={{ fontWeight: 'bold', fontSize: '1.2em', color: color }}>${parseFloat(amount).toFixed(2)}</span> 
            </form>
            {renderAmounts()}
        </div>
    );
};

export default AmountForm;