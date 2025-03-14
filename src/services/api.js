import axios from "axios";

const API_KEY = '67d35f63e2dcbf7e4ebe4d4b'; // Replace with your actual API key
const BASE_URL = "https://api.makcorps.com/";

const apiClient = axios.create({
    baseURL: BASE_URL,
});

export const searchCities = async (query) => {
    try {
        const response = await apiClient.get("/search", {
            params: {
                query: query,
                api_key: API_KEY, // Pass API key as a query parameter
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cities:", error);
        throw new Error("Failed to fetch cities. Please try again later.");
    }
};

export const fetchHotelsByCityId = async (cityId, checkin, checkout, adults,children, rooms = 1, currency = 'USD') => {
    try {
        const response = await apiClient.get("/city", {
            params: {
                api_key: API_KEY,
                cityid: cityId,
                checkin: checkin,
                checkout: checkout,
                adults: adults,
                children: children,
                rooms: rooms,
                cur: currency,
                pagination: 1
              }
            });
            return response.data;
    } catch (error) {
        console.error("Error fetching hotels:", error);
        throw new Error("Failed to fetch hotels. Please try again later.");
    }
};

export const getCityById = async (cityId) => {
    try {
        const response = await apiClient.get(`/city/${cityId}`, {
            params: {
                api_key: API_KEY, // Pass API key as a query parameter
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching city:", error);
        throw new Error("Failed to fetch city details. Please try again later.");
    }
};
export const mapping = async (name) => {
    try {
      const response = await apiClient.get("/mapping", {
        params: {
          api_key: API_KEY,
          name: encodeURIComponent(name)
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error mapping hotel/city:", error);
      throw new Error("Failed to map hotel/city. Please try again later.");
    }
};