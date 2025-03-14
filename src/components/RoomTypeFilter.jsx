import React, { useState } from "react";

const RoomTypeFilter = ({ onRoomTypesChange }) => {
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);

  const roomTypes = [
    { id: "single", label: "Single" },
    { id: "double", label: "Double" },
    { id: "twin", label: "Twin" },
    { id: "suite", label: "Suite" },
    { id: "family", label: "Family" },
  ];

  const handleRoomTypeChange = (roomTypeId) => {
    const updatedRoomTypes = selectedRoomTypes.includes(roomTypeId)
      ? selectedRoomTypes.filter((id) => id !== roomTypeId) // Remove if already selected
      : [...selectedRoomTypes, roomTypeId]; // Add if not selected

    setSelectedRoomTypes(updatedRoomTypes);
    onRoomTypesChange(updatedRoomTypes); // Pass updated room types to parent
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Room Type
      </label>
      <div className="flex flex-wrap gap-2">
        {roomTypes.map((roomType) => (
          <label
            key={roomType.id}
            className={`flex items-center px-3 py-1 text-sm rounded-full cursor-pointer border transition-colors duration-200
              ${
                selectedRoomTypes.includes(roomType.id)
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
              }`}
          >
            <input
              type="checkbox"
              className="sr-only" // Hide the default checkbox visually
              checked={selectedRoomTypes.includes(roomType.id)}
              onChange={() => handleRoomTypeChange(roomType.id)}
            />
            <span>{roomType.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RoomTypeFilter;