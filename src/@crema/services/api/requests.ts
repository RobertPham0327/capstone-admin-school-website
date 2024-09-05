import { Request as CremaRequest } from "@crema/types/models/apps/Request";

const API_URL = 'http://ec2-54-169-237-21.ap-southeast-1.compute.amazonaws.com:3000/api/v1/request';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc3LCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6InNjaG9vbEFkbWluIiwiaWF0IjoxNzI0Mzk2ODY0LCJleHAiOjE3MzQ3NjQ4NjR9.TxPRmW8eLTJTTsqMZez7u5_Pm1GFvzLb0L16A_Ha5ew'; // Replace with your actual token

export const getAllRequests = async (): Promise<CremaRequest[]> => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTH_TOKEN}`, // Add the authorization header
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching requests: ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error('Unexpected response format');
        }

        return data as CremaRequest[];
    } catch (error) {
        console.error('Failed to fetch requests:', error);
        return [];
    }
};

export const updateRequestStatus = async (request_id: string, status: string): Promise<void> => {
    try {
        const url = `${API_URL}/${request_id}/${status}`; // Construct the URL with ID and status

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTH_TOKEN}`, // Add the authorization header
            },
        });

        if (!response.ok) {
            throw new Error(`Error updating request status: ${response.statusText}`);
        }

        // Optionally, you can handle the response or return some data
        // const data = await response.json();
        // return data; // If needed

        console.log('Request status updated successfully');
    } catch (error) {
        console.error('Failed to update request status:', error);
    }
};
