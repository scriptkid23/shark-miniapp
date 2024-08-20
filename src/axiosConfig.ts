// axiosConfig.ts
import axios, { AxiosInstance } from 'axios';
import { retrieveLaunchParams } from '@telegram-apps/sdk';
// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://shark-api.hoodlab.pro/api',
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
    // config.headers['ngrok-skip-browser-warning']=true]
    const { initDataRaw } = retrieveLaunchParams();
    config.headers['Authorization'] = 'tma ' + (initDataRaw as string);
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
