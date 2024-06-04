import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="flex items-center gap-8 font-sans">
      <div>
        <h3 className='text-center text-slate-50 p-2 text-lg'>Desde</h3>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline
        />
      </div>
      <div>
        <h3 className='text-center text-slate-50 p-2 text-lg'>Hasta</h3>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          inline
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
