import axios from 'axios';

const apiConfig = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
  // withXSRFToken: true,
});
export default apiConfig;
