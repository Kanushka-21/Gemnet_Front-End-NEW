import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for request and response
apiClient.interceptors.request.use(
  (config) => {
    // Add any custom logic before sending the request
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Handle response data
    return response.data;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);

export const getGems = async () => {
  return await apiClient.get('/gems');
};

export const getGemById = async (id) => {
  return await apiClient.get(`/gems/${id}`);
};

export const createUser = async (userData) => {
  return await apiClient.post('/users', userData);
};

export const loginUser = async (credentials) => {
  return await apiClient.post('/auth/login', credentials);
};

// Add more API methods as needed

export default apiClient;