import type { User, Experience } from '../Interface/interface';
import axiosInstance from './axiosInstance';

// Login API
export const loginApi = (data: { username: string; password: string }) => {
  console.log('Login API called with:', data);
  return axiosInstance.post('/auth/login', data);
};

// Register API
export const registerApi = (data: { email: string; username: string; password: string }) => {
  console.log('Register API called with:', data);
  return axiosInstance.post('/auth/register', data);
};

// Get all users
export const getUserListApi = () => {
  console.log('Get user list API called');
  return axiosInstance.get('/auth/getAllUsers');
};

// Search users
export const getUserSearchApi = (username: string) => {
  console.log('User search API called with:', username);
  // Handle empty search term
  const searchParam = username ? `?q=${encodeURIComponent(username)}` : '';
  return axiosInstance.get(`/auth/searchUsers${searchParam}`);
};

// User profile creation - updated to match your interface
export const userProfile = (data: { category: string; skills: string[] }) => {
  console.log('User profile API called with:', data);
  return axiosInstance.post('/auth/userProfile', data);
};

// Update about section
export const updateAbout = (about: string) => {
  console.log('Update about API called with:', { about });
  return axiosInstance.put('/auth/updateAbout', { about });
};

// Get current user
export const getCurrentUser = () => {
  console.log('Get current user API called');
  return axiosInstance.get('/auth/currentUser');
};

// Get profile by ID
export const getProfileById = (id: string) => {
  console.log('Get profile by ID API called with:', id);
  return axiosInstance.get(`/auth/profile/${id}`);
};

// Update profile
export const updateProfile = (id: string, updateData: Partial<User>) => {
  console.log('Update profile API called with:', { id, updateData });
  return axiosInstance.put(`/auth/profile/${id}`, updateData);
};

// Update experience - updated to match your Experience interface
export const updateExperience = (
  id: string, 
  experienceId: string, 
  updateData: Partial<Experience>
) => {
  console.log('Update experience API called with:', { id, experienceId, updateData });
  return axiosInstance.put(`/auth/profile/${id}/experiences/${experienceId}`, updateData);
};

// Add experience - new function
export const addExperience = (id: string, experienceData: Omit<Experience, '_id'>) => {
  console.log('Add experience API called with:', { id, experienceData });
  return axiosInstance.post(`/auth/profile/${id}/experiences`, experienceData);
};

// Delete experience - new function
export const deleteExperience = (id: string, experienceId: string) => {
  console.log('Delete experience API called with:', { id, experienceId });
  return axiosInstance.delete(`/auth/profile/${id}/experiences/${experienceId}`);
};

// Test API connection
export const testConnection = async () => {
  try {
    console.log('Testing API connection...');
    const response = await axiosInstance.get('/health'); // or '/test'
    console.log('API connection test successful:', response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('API connection test failed:', error);
    
    let errorMessage = 'Connection failed';
    
    if (!error.response) {
      errorMessage = 'Cannot reach server - check if backend is running';
    } else if (error.response.status === 404) {
      errorMessage = 'API endpoint not found';
    } else if (error.response.status >= 500) {
      errorMessage = 'Server error';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Utility function to handle API errors consistently
export const handleApiError = (error: any) => {
  console.error('API Error:', error);
  
  if (!error.response) {
    return {
      message: 'Network error - please check your connection and ensure the server is running',
      type: 'network'
    };
  }
  
  switch (error.response.status) {
    case 400:
      return {
        message: error.response.data?.message || 'Invalid request data',
        type: 'validation'
      };
    case 401:
      return {
        message: error.response.data?.message || 'Authentication required',
        type: 'auth'
      };
    case 403:
      return {
        message: error.response.data?.message || 'Access forbidden',
        type: 'auth'
      };
    case 404:
      return {
        message: error.response.data?.message || 'Resource not found',
        type: 'notfound'
      };
    case 409:
      return {
        message: error.response.data?.message || 'Resource already exists',
        type: 'conflict'
      };
    case 500:
      return {
        message: error.response.data?.message || 'Server error',
        type: 'server'
      };
    default:
      return {
        message: error.response.data?.message || 'An error occurred',
        type: 'unknown'
      };
  }
};