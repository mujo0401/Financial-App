import React, { useState, useEffect } from 'react';
import { Label } from 'components/assets/labelAssets';
import { Input } from 'components/assets/inputAssets';   

const AmountForm = ({ onAmountChange, reset, initialAmount = '' }) => {
    const [amount, setAmount] = useState(initialAmount);
    const [isInteracted, setIsInteracted] = useState(false);

    useEffect(() => {
        if (reset) {
            setAmount(initialAmount);
            setIsInteracted(false);
        }
    }, [reset, initialAmount]);

    const handleAmountChange = (newAmount) => {
        const parsedAmount = parseFloat(newAmount);
        setAmount(parsedAmount);
        onAmountChange(parsedAmount); 
        setIsInteracted(true); 
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
                style={{ background: color, WebkitAppearance: 'none' }}
            />
            {isInteracted && (
                <span style={{ fontWeight: 'bold', fontSize: '1.2em', color: color }}>
                    ${parseFloat(amount).toFixed(2)}
                </span>
            )}
        </div>
    );
};

export default AmountForm;
