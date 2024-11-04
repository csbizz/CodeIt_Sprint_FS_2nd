import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  // baseURL: 'https://learn.codeit.kr/api/link-service/',
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    console.log('r', error.response);
    if (
      error.response?.status === 401 &&
      error.response?.data !== 'empty' &&
      !originalRequest._retry
    ) {
      await instance.post('/auth/token/refresh', undefined, { _retry: true });
      originalRequest._retry = true;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
