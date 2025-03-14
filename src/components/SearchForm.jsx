import React, { useState } from 'react';
import CitySearch from './CitySearch';
import HotelDatePicker from './DatePicker';
import GuestSelector from './GuestSelector';
import RoomTypeFilter from './RoomTypeFilter';

const SearchForm = ({ onSearch, loading }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [dates, setDates] = useState({
    checkin: new Date().toISOString().split('T')[0],
    checkout: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
  });
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1
  });
  const [roomTypes, setRoomTypes] = useState([]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleDatesChange = (checkin, checkout) => {
    setDates({ checkin, checkout });
  };

  const handleGuestsChange = (guestData) => {
    setGuests(guestData);
  };

  const handleRoomTypesChange = (selectedRoomTypes) => {
    setRoomTypes(selectedRoomTypes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedCity) {
      alert('Please select a destination');
      return;
    }
    
    onSearch({
      cityId: selectedCity.id,
      ...dates,
      ...guests,
      roomTypes
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="col-span-1 md:col-span-2">
          <CitySearch onCitySelect={handleCitySelect} />
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <HotelDatePicker onDatesChange={handleDatesChange} />
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <GuestSelector onGuestsChange={handleGuestsChange} />
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <RoomTypeFilter onRoomTypesChange={handleRoomTypesChange} />
        </div>
      </div>
      
      <div className="flex justify-end">
      <button
  type="submit"
  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Search Hotels
</button>
      </div>
    </form>
  );
};

export default SearchForm;  