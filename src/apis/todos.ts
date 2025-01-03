import axios from 'axios';
import { instance } from '.';

export const taskInstance = axios.create({
  baseURL: `${instance.defaults.baseURL}/task`,
});

export const taskAPI = {
  createTask: async (content: string) => {
    const response = await taskInstance.post('', { content });
    return response.data;
  },

  updateTask: async (taskId: number, content: string) => {
    const response = await taskInstance.patch('', { taskId, content });
    return response.data;
  },

  checkTask: async (taskId: number, check: boolean) => {
    const response = await taskInstance.patch('/check', { taskId, check });
    return response.data;
  },

  // 삭제 API
  deleteTask: async (taskId: number) => {
    const response = await taskInstance.delete('', { data: { taskId } });
    return response.status;
  },

  // 읽기 API
  getTasks: async () => {
    const response = await instance.get('');
    return response.data;
  },
};
