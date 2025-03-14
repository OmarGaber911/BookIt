import React, { useState } from "react";

const GuestSelector = ({ onGuestsChange }) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleAdultsChange = (value) => {
    const newAdults = Math.max(1, Math.min(10, value));
    setAdults(newAdults);
    onGuestsChange({ adults: newAdults, children, rooms });
  };

  const handleChildrenChange = (value) => {
    const newChildren = Math.max(0, Math.min(6, value));
    setChildren(newChildren);
    onGuestsChange({ adults, children: newChildren, rooms });
  };

  const handleRoomsChange = (value) => {
    const newRooms = Math.max(1, Math.min(5, value));
    setRooms(newRooms);
    onGuestsChange({ adults, children, rooms: newRooms });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adults
          </label>
          <div className="flex items-center">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l-md"
              onClick={() => handleAdultsChange(adults - 1)}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="10"
              value={adults}
              onChange={(e) => handleAdultsChange(parseInt(e.target.value || 1))}
              className="w-12 p-2 text-center border-t border-b border-gray-300 focus:outline-none"
            />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r-md"
              onClick={() => handleAdultsChange(adults + 1)}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Children
          </label>
          <div className="flex items-center">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l-md"
              onClick={() => handleChildrenChange(children - 1)}
            >
              -
            </button>
            <input
              type="number"
              min="0"
              max="6"
              value={children}
              onChange={(e) => handleChildrenChange(parseInt(e.target.value || 0))}
              className="w-12 p-2 text-center border-t border-b border-gray-300 focus:outline-none"
            />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r-md"
              onClick={() => handleChildrenChange(children + 1)}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rooms
          </label>
          <div className="flex items-center">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l-md"
              onClick={() => handleRoomsChange(rooms - 1)}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max="5"
              value={rooms}
              onChange={(e) => handleRoomsChange(parseInt(e.target.value || 1))}
              className="w-12 p-2 text-center border-t border-b border-gray-300 focus:outline-none"
            />
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r-md"
              onClick={() => handleRoomsChange(rooms + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestSelector;