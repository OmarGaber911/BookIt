import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HotelDatePicker = ({ onDatesChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // validation check
    if (endDate <= date) {
      const newEndDate = new Date(date);
      newEndDate.setDate(newEndDate.getDate() + 1);
      setEndDate(newEndDate);
      onDatesChange(formatDate(date), formatDate(newEndDate));
    } else {
      onDatesChange(formatDate(date), formatDate(endDate));
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDatesChange(formatDate(startDate), formatDate(date));
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-in Date
        </label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          dateFormat="yyyy-MM-dd"
        />
      </div>
      
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Check-out Date
        </label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={new Date(startDate.getTime() + 86400000)} // Next day after check-in
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </div>
  );
};

export default HotelDatePicker;