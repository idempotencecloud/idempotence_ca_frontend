import axios from 'axios';
import router from './router/index'

const httpClient = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your API base URL
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Unauthorized error, token may have expired
      // You can also check for specific error messages from the API if needed
      localStorage.setItem('token', '');
      router.push({ name: 'Login' });
    }
    return Promise.resolve({});
  }
);

export default httpClient;