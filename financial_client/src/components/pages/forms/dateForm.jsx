import React from 'react';
import { Button, Label, Input } from 'components/assets/localStyle';

const DateForm = ({ dates = [], handleDateChange, addDate }) => {
    return (
      <div>
        <Label htmlFor="date">Select Date</Label>
        {dates.map((date, index) => (
          <Input
            key={index}
            type="date"
            name="date"
            value={date}
            onChange={e => handleDateChange(e, index)}
            required
          />
        ))}
        <Button type="button" onClick={addDate}>Add another date</Button>
      </div>
    );
  };
export default DateForm;