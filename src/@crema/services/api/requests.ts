import { Request } from "@crema/types/models/apps/Request";

const getAllRequests = async () => {
    try {
        const response = await fetch('http://18.140.148.120:8082/api/v1/request');
        const data = await response.json();
        return data as Request[];
    } catch (error) {
        console.log(error);
    }
}
