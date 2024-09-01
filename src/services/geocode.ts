import axios from 'axios';

const REVERSE_GEOCODE_URL = 'https://nominatim.openstreetmap.org/reverse';

interface ReverseGeocodeResponse {
  address: {
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

export const getLocationDetails = async (lat: number, lon: number) => {
  try {
    const response = await axios.get<ReverseGeocodeResponse>(REVERSE_GEOCODE_URL, {
      params: {
        lat,
        lon,
        format: 'json',
        addressdetails: 1,
      },
    });

    return response.data.address;
  } catch (error) {
    console.error('Error fetching location details:', error);
    return {};
  }
};