import axios from 'axios';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc3LCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6InNjaG9vbEFkbWluIiwiaWF0IjoxNzI0MzQ5ODA5LCJleHAiOjE3MzQ3MTc4MDl9.Z3SmnMbpclkdOJMY-MipiIRrwyJHUznwQQkRArHZECk'
const apiConfig = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`,
    
  },
  // withCredentials: true,
  // withXSRFToken: true,
});
export default apiConfig;
