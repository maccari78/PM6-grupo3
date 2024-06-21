import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isEqual, startOfDay, format } from "date-fns";

interface ISetPrice {
  (newPrice: number): void;
}

interface IStartDate {
  (date: string): void;
}

interface IEndDate {
  (date: string): void;
}

const DateRangePicker: React.FC<{
  bookedDates: String[];
  handleSetPrice: ISetPrice;
  price: number | undefined;
  handleStartDate: IStartDate;
  handleEndDate: IEndDate;
}> = ({
  bookedDates,
  handleSetPrice,
  price,
  handleStartDate,
  handleEndDate,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const priceTotal = () => {
    if (startDate && endDate) {
      const dayInMillis = 24 * 60 * 60 * 1000;
      const differenceInDays = Math.round(
        (endDate.getTime() - startDate.getTime()) / dayInMillis
      );
      const totalPrice = differenceInDays * price!;
      handleSetPrice(totalPrice);
    } else if (startDate === null || endDate === null) {
      const defaultPrice = price;
      handleSetPrice(defaultPrice!);
    }
  };

  const setStartAndEndDate = () => {
    const startDateFull = startDate ? format(startDate, "MM/dd/yyyy") : "";
    handleStartDate(startDateFull);

    const endDateFull = endDate ? format(endDate, "MM/dd/yyyy") : "";
    handleEndDate(endDateFull);
  };

  useEffect(() => {
    setStartAndEndDate();
  }, [startDate, endDate]);

  useEffect(() => {
    priceTotal();
  }, [startDate, endDate, price]);

  const isDateAvailable = (date: Date): boolean => {
    const normalizedDate = startOfDay(date);
    return !bookedDates.some((bookedDate) =>
      isEqual(startOfDay(bookedDate.toString()), normalizedDate)
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 h-full justify-between items-start w-full">
      <div className="flex flex-col h-full gap-3">
        <DatePicker
          showIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7 stroke-gray-700 fill-[#C4FF0D]"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M16 3l0 4" />
              <path d="M8 3l0 4" />
              <path d="M4 11l16 0" />
              <path d="M8 15h2v2h-2z" />
            </svg>
          }
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          filterDate={isDateAvailable}
          className="px-3 py-2 w-full flex items-center justify-center border focus:outline-none focus:border-[#C4FF0D] focus:border-[1.5px] bg-gray-100 rounded-md z-50"
          placeholderText="Selecciona la fecha de inicio"
          minDate={new Date()}
          popperPlacement="top-end"
        />
        <DatePicker
          showIcon
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 stroke-gray-700 fill-[#C4FF0D]"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M16 3l0 4" />
              <path d="M8 3l0 4" />
              <path d="M4 11l16 0" />
              <path d="M8 15h2v2h-2z" />
            </svg>
          }
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate ? addDays(startDate, 1) : undefined}
          filterDate={isDateAvailable}
          className="px-3 py-2 border w-full items-center justify-center focus:outline-none focus:border-[#C4FF0D] focus:border-[1.5px] bg-gray-100 rounded-md z-50"
          placeholderText="Selecciona la fecha de fin"
          popperPlacement="top-end"
        />
      </div>
      {startDate && endDate && (
        <div className="flex flex-col w-full md:w-[50%] px-4 py-4 border gap-2 border-gray-900 bg-[#222222] rounded-md font-sans">
          <div className="flex flex-row w-full justify-between items-center">
            <p className="text-gray-300 text-sm md:text-base">
              Fecha de inicio:
            </p>
            <span className="bg-[#b0d63f]  text-[#222222] text-xs md:text-sm font-medium me-2 px-2.5 py-0.5 rounded-full ">
              {startDate.toDateString()}
            </span>
          </div>
          <div className="flex flex-row w-full justify-between items-center">
            <p className="text-gray-300 text-sm md:text-base">Fecha de fin: </p>
            <span className="bg-[#b0d63f]  text-[#222222] text-xs md:text-sm font-medium me-2 px-2.5 py-0.5 rounded-full ">
              {endDate.toDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
