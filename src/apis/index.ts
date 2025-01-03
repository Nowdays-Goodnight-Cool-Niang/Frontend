import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://cool-niang.kro.kr/api',
  timeout: 10000,
});
