import React, { useState } from 'react';
import { Input, Label } from 'components/assets/localStyle';

const AmountForm = ({ onAmountChange }) => {
    const [amountEntries] = useState([]);
    const [amount, setAmount] = useState('');
    const [isInteracted, setIsInteracted] = useState(false);

    const handleAmountChange = (newAmount) => {
        const parsedAmount = parseFloat(newAmount);
        setAmount(parsedAmount);
        onAmountChange(parsedAmount); 
        setIsInteracted(true); 
      };


    const renderAmounts = () => {
        return amountEntries.map((amount, index) => (
            <div key={index}>
                {amount}
            </div>
        ));
    };

    // Calculate color based on amount
    const color = amount < 1000 ? 'green' : amount < 4000 ? 'orange' : 'red';

    return (
        <div>
            <Label htmlFor="amount">Input Amount</Label>
            <Input
                type="number"
                min="0"
                max="10000"
                step="0.01"
                value={amount}
                onChange={e => handleAmountChange(e.target.value)}
                required
            />
            <Input
                type="range"
                min="0"
                max="10000"
                step="0.01"
                value={amount}
                onChange={e => handleAmountChange(e.target.value)}
                required
                style={{
                    background: color,
                    WebkitAppearance: 'none'
                }}
            />
            {isInteracted && <span style={{ fontWeight: 'bold', fontSize: '1.2em', color: color }}>
                ${parseFloat(amount).toFixed(2)}
            </span>}
            {renderAmounts()}
        </div>
    );
};

export default AmountForm;
