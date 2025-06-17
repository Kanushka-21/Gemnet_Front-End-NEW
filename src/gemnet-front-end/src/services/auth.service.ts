import axios from 'axios';

const API_URL = 'http://your-api-url.com/api/'; // Replace with your actual API URL

const authService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}auth/login`, {
      email,
      password,
    });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  register: async (name: string, email: string, password: string) => {
    return await axios.post(`${API_URL}auth/register`, {
      name,
      email,
      password,
    });
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user') || '{}');
  },
};

export default authService;