import axios from 'axios';
import { instance } from '.';

export const accountInstance = axios.create({
  baseURL: `${instance.defaults.baseURL}/accounts`,
});

export const accountAPI = {
  getAccount: async () => {
    const response = await accountInstance.get('');
    return response.data;
  },

  getParticipantInfo: async (name: string, phone: string, profileImageId: number, githubUrl: string, instagramUrl: string, facebookUrl: string) => {
    const response = await accountInstance.patch('', {name, phone, profileImageId, githubUrl, instagramUrl, facebookUrl});
    return response.data;
  },
};
