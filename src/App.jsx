import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import HotelResults from './components/HotelResults';
import { fetchHotelsByCityId } from './services/api';

function App() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roomTypeFilters, setRoomTypeFilters] = useState([]);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const { cityId, checkin, checkout, adults, children, rooms, roomTypes } = searchParams;
      
      const hotelData = await fetchHotelsByCityId(
        cityId, checkin, checkout, adults, children, rooms
      );
      
      setHotels(hotelData);
      setRoomTypeFilters(roomTypes || []);
    } catch (err) {
      setError('Failed to fetch hotels. Please try again.');
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Hotel Search</h1>
        <p className="text-gray-600">Find the perfect accommodation for your trip</p>
      </header>
      
      <main>
        <SearchForm onSearch={handleSearch} loading={loading} />
        <HotelResults 
          hotels={hotels} 
          loading={loading} 
          error={error}
          roomTypeFilters={roomTypeFilters}
        />
      </main>
    </div>
  );
}

export default App;