import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Super simple Axios wrapper.
 */
export const api = {
  get: async (endpoint: string) => {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return { data: response.data };
  },
};

// please, just use this
export const apiClient = axios.create({
  baseURL: BASE_URL, 
  headers: {
    "Content-Type": "application/json"
  }
})