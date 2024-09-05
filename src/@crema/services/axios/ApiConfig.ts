import axios from 'axios';

const apiConfig = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },

  withCredentials: false,
  // withXSRFToken: true,
});
export default apiConfig;
