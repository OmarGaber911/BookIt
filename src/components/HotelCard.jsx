import React from 'react';

const HotelCard = ({ hotel }) => {
  const {
    name,
    hotelId,
    geocode,
    reviews,
    telephone,
    price1,
    vendor1
  } = hotel;

  // Using a placeholder image since the API doesn't provide images
  const imageUrl = `/api/placeholder/400/250`;

  // Function to render stars based on rating
  const renderStars = (rating) => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {i === fullStars && hasHalfStar ? (
              <path
                fillRule="evenodd"
                d="M10 15.385l-7.022 4.254 1.838-7.878L.344 7.381l7.716-.643L10 0l2.94 6.738 7.716.643-4.472 4.38 1.838 7.878z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M10 15.385l-7.022 4.254 1.838-7.878L.344 7.381l7.716-.643L10 0l2.94 6.738 7.716.643-4.472 4.38 1.838 7.878z"
                clipRule="evenodd"
              />
            )}
          </svg>
        ))}
        {reviews && reviews.count && (
          <span className="ml-2 text-sm text-gray-500">({reviews.count})</span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 bg-gray-200">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/api/placeholder/400/250';
          }}
        />
        {price1 && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            ${typeof price1 === 'number' ? price1.toFixed(2) : price1} / night
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
        
        {reviews && reviews.rating && (
          <div className="my-2">{renderStars(reviews.rating)}</div>
        )}
        
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {geocode && (
            <span>
              Lat: {geocode.latitude.toFixed(4)}, Long: {geocode.longitude.toFixed(4)}
            </span>
          )}
        </div>
        
        {telephone && (
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{telephone}</span>
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;