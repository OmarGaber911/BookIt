import React from "react";
import HotelCard from "./HotelCard";

const HotelResults = ({ hotels,loading,error,roomTypeFilters }) => {
    if (loading) {
     return (
        <div className="w-full flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>

        </div>
     )
    };

    if (error) {
        return(
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mt-6" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative mt-6" role="alert">
        <strong className="font-bold">No results found. </strong>
        <span className="block sm:inline">Try adjusting your search criteria.</span>
      </div>
    );
  }
  const filteredHotels = roomTypeFilters.length > 0
    ? hotels.filter(hotel => {
        // This is a simplified example, as the API response might have a different structure
        // You would need to adapt this based on actual API response
        if (!hotel.roomTypes) return false;
        return roomTypeFilters.some(roomType => hotel.roomTypes.includes(roomType));
      })
    : hotels;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} found
        </h2>
        <div className="flex space-x-2">
          <select className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.hotelId} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelResults;
