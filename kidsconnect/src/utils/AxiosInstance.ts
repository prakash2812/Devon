import axios, { AxiosInstance } from 'axios';
// Create an Axios instance with base URL
export const baseAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // Replace with your base URL
});
