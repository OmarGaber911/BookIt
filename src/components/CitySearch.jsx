import React, { useState, useEffect } from "react";
import { searchCities, mapping } from "../services/api";

const CitySearch = ({ onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length >= 3) {
        handleCitySearch();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleCitySearch = async () => {
    if (!query || query.length < 3) return;
    setLoading(true);
    setError(null);
    try {
      // Use the mapping API to get city data
      const citiesData = await mapping(query);
      setCities(citiesData || []);
      setShowDropdown(true);
    } catch (err) {
      setError('Failed to fetch cities');
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCityClick = (city) => {
    setQuery(city.name || city.title);
    onCitySelect({
      id: city.document_id,
      name: city.name || city.title
    });
    setShowDropdown(false);
  };

  // Mock data for development
  const mockCities = [
    { document_id: 60763, title: 'New York, United States', type: 'CITY' },
    { document_id: 60745, title: 'Los Angeles, United States', type: 'CITY' },
    { document_id: 60732, title: 'Chicago, United States', type: 'CITY' }
  ];

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
        Destination
      </label>
      <div className="relative">
        <input
          id="destination"
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city or hotel name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setShowDropdown(true)}
        />
        {loading && (
          <div className="absolute right-3 top-2.5">
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      
      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md max-h-60 overflow-auto">
          {(process.env.NODE_ENV === 'development' ? mockCities : cities).length > 0 ? (
            (process.env.NODE_ENV === 'development' ? mockCities : cities).map((city) => (
              <div
                key={city.document_id}
                className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                onClick={() => handleCityClick(city)}
              >
                {city.title || city.name} ({city.type})
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No cities found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CitySearch;