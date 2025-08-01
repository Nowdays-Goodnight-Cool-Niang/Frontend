import axios from 'axios';
import { IAccountUpdateRequest } from '@/types/domain/account';

export const accountInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/accounts`,
  withCredentials: true,
});

export const accountAPI = {
  getProfile: async () => {
    const response = await accountInstance.get('');
    return response.data;
  },

  checkAuthenticated: async () => {
    const response = await accountInstance.get('/authenticated');
    return response.data;
  },

  patchProfileInfo: async (data: IAccountUpdateRequest) => {
    const response = await accountInstance.patch('', data, { withCredentials: true });
    return response.data;
  },

  deleteAccount: async (reason: string) => {
    const response = await accountInstance.delete('', {
      data: reason ? { feedback: reason } : undefined,
    });
    return response.data;
  },
};
