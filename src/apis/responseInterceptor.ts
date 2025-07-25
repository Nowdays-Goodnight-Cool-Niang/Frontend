import toast from 'react-hot-toast';
import { accountInstance } from './accounts';
import { eventInstance } from './event/event.api';
import { kakaoAuthInstance } from './kakao';
import { authInstance } from './auth';
import { AxiosError } from 'axios';
import { TOAST_MESSAGE } from '@/constants/message';

export const setupAxiosInterceptors = () => {
  const handleResponseError = (error: AxiosError) => {
    if (!error.response) {
      toast.error(TOAST_MESSAGE.ERROR_NETWORK);
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if (status === 401) {
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

      toast(TOAST_MESSAGE.SESSION_EXPIRED, {
        icon: '🙏🏻',
        duration: 4000,
      });
    } else if (status === 500) {
      toast.error(TOAST_MESSAGE.ERROR_SERVER);
    }

    if (error.config) {
      error.config._handledByInterceptor = true;
    }
    return Promise.reject(error);
  };

  [accountInstance, eventInstance, kakaoAuthInstance, authInstance].forEach((instance) => {
    instance.interceptors.response.use((response) => response, handleResponseError);
  });
};
