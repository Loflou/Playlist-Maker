import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('Registration successful, user data stored in localStorage');
    } else {
      console.error('Registration successful, but no accessToken received. Check backend implementation.');
      throw new Error('Registration successful, but no accessToken received. Check backend implementation.');
    }
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data.message : error.message, error);
    throw error;
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'token', userData);
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('Login successful, user data stored in localStorage');
    } else {
      console.error('Login successful, but no access_token received. Check backend implementation.');
      throw new Error('Login successful, but no access_token received. Check backend implementation.');
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data.detail : error.message, error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  console.log('User logged out, localStorage cleared');
};

const userService = {
  register,
  login,
  logout
};

export default userService;