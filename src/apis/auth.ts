import axios from 'axios';
import { instance } from '.';

export const authAPI = {
  login: async (loginId: string, password: string) => {
    try {
      const response = await instance.post('/login', { loginId, password });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error('Unauthorized');
      }
      throw error;
    }
  },

  signup: async (loginId: string, password: string) => {
    try {
      const response = await instance.post('/signup', { loginId, password });
      return response.status;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error('Bad Request');
      }
      throw error;
    }
  },

  logout: async () => {
    const response = await instance.post('/logout');
    return response.status;
  },
};
