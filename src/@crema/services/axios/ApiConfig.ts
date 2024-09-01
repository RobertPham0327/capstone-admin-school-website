import axios from 'axios';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc3LCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6InNjaG9vbEFkbWluIiwiaWF0IjoxNzI0OTk0MDA4LCJleHAiOjE3MzUzNjIwMDh9.8oOlpVfze7fSIkhi3s3rBsd-uBL9aC6FgTQoE1gZd9M';
const apiConfig = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`,
  },
  // withCredentials: true,
  // withXSRFToken: true,
});
export default apiConfig;
