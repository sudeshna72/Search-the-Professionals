import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this to your backend URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('Making request to:', config.url); // Debug log
    console.log('Request config:', config); // Debug log
    
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added token to request:', token); // Debug log
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle common responses and errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response received:', response); // Debug log
    return response;
  },
  (error: AxiosError) => {
    console.error('Response interceptor error:', error); // Debug log
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log('Auth error - clearing storage and redirecting');
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      
      // Only redirect if not already on login/register page
      if (!window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/register') &&
          window.location.pathname !== '/') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Test function to verify API connection
export const testApiConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing API connection...');
    const response = await axiosInstance.get('/test'); // Create a test endpoint on your backend
    console.log('API connection successful:', response.data);
    return true;
  } catch (error: any) {
    console.error('API connection failed:', error);
    
    // Check if it's a network error
    if (!error.response) {
      console.error('Network Error: Cannot reach the server. Please check:');
      console.error('1. Is your backend server running?');
      console.error('2. Is the baseURL correct?');
      console.error('3. Are there any CORS issues?');
    }
    
    return false;
  }
};

// Alternative configuration for different environments
export const getApiUrl = (): string => {
  const environment = process.env.NODE_ENV || 'development';
  
  switch (environment) {
    case 'production':
      return 'https://your-production-api.com/api';
    case 'staging':
      return 'https://your-staging-api.com/api';
    default:
      return 'http://localhost:5000/api'; // Development
  }
};

// If you need to change the base URL dynamically
export const updateBaseURL = (newBaseURL: string): void => {
  axiosInstance.defaults.baseURL = newBaseURL;
  console.log('Updated API base URL to:', newBaseURL);
};