import React, { useState } from 'react';
import { Label, Input } from 'components/assets/localStyle';

const DateForm = ({ onDateChange }) => {
  const currentDate = new Date('01-01-2024');
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(formatDate(currentDate));
  const [endDate, setEndDate] = useState(formatDate(oneYearFromNow));

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    onDateChange(event.target.value, endDate);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    onDateChange(startDate, event.target.value);
  };

  return (
    <div>
      <Label htmlFor="start-date">Start Date:</Label>
      <Input
        type="date"
        id="start-date"
        value={startDate}
        onChange={handleStartDateChange}
        required
      />
      <Label htmlFor="end-date">End Date:</Label>
      <Input
        type="date"
        id="end-date"
        value={endDate}
        onChange={handleEndDateChange}
        required
      />
    </div>
  );
};

export default DateForm;