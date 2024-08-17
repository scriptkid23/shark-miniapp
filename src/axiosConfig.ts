// axiosConfig.ts
import axios, { AxiosInstance } from 'axios';

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://b28d-2405-4802-1c62-2ac0-44f-282c-a3fc-f7fb.ngrok-free.app/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',

    get: {
      'ngrok-skip-browser-warning': true,
    },
  },
});

// You can also set up interceptors for requests or responses
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config before the request is sent
    // config.headers['ngrok-skip-browser-warning']=true
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Process the response data
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
