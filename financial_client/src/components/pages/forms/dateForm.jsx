import React, { useState } from 'react';
import { Label, Input } from 'components/assets/localStyle';

const DateForm = ({ onDateChange }) => {
  console.log("onDateChange prop:", onDateChange);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div>
      <Label htmlFor="date">Select Date</Label>
      <Input
        type="date"
        value={date}
        onChange={e => handleDateChange(e.target.value)}
        required
      />
    </div>
  );
};


export default DateForm;
