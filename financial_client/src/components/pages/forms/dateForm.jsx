import React, { useState } from 'react';
import { Label, Input } from 'components/assets/localStyle';

const DateForm =  ({ onDateChange }) => {
  const [dateEntries, setDateEntries] = useState([]);

  const handleDateChange = (event) => {
    onDateChange(event.target.value);
  };

  const handleAddDate = (date) => {
    setDateEntries(prev => [...prev, date]);
  };

  const renderDates = () => {
    return dateEntries.map((date, index) => (
        <div key={index}>
            {date}
        </div>
    ));
  };

  // Get today's date and format it in the YYYY-MM-DD format
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [date, setDate] = useState(formattedDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddDate(date);
    onDateChange(date);
    setDate(formattedDate);
  }

  return (
    <div>
      <Label htmlFor="date">Select Date</Label>
      <form onSubmit={handleSubmit}>
        <Input
          type="date"
          value={date}
          onChange={e => {
            setDate(e.target.value);
            handleDateChange(e.target.value);
          }}
          required
        />
      </form>
      {renderDates()}
    </div>
  );
};
export default DateForm;