import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, isEqual, startOfDay } from 'date-fns';

interface IDateRangePicker {
  bookedDates: String[];
}

const DateRangePicker: React.FC<IDateRangePicker> = ({ bookedDates }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const isDateAvailable = (date: Date): boolean => {
    const normalizedDate = startOfDay(date);
    return !bookedDates.some(bookedDate => isEqual(startOfDay(bookedDate.toString()), normalizedDate));
  };

  return (    <div className="flex flex-col space-y-4">
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => setStartDate(date)}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      minDate= {new Date()}
      filterDate={isDateAvailable}
      className="px-3 py-2 border border-gray-300 rounded-md"
      placeholderText="Selecciona la fecha de inicio"
    />
    <DatePicker
      selected={endDate}
      onChange={(date: Date | null) => setEndDate(date)}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate ? addDays(startDate, 1) : undefined}
      filterDate={isDateAvailable}
      className="px-3 py-2 border border-gray-300 rounded-md"
      placeholderText="Selecciona la fecha de fin"
    />
    {startDate && endDate && (
      <div className="mt-4 p-4 border border-gray-900 bg-[#222222] rounded-md font-sans">
        <p className='text-slate-50'>Fecha de inicio: {startDate.toDateString()}</p>
        <p className='text-slate-50'>Fecha de fin: {endDate.toDateString()}</p>
      </div>
    )}
  </div>
    );
};

export default DateRangePicker;
