import axios from 'axios';
import router from './router';

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

httpClient.pendingRedirect = '/control-plane';

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Unauthorized error, token may have expired
      // You can also check for specific error messages from the API if needed
      if (router.currentRoute.value.fullPath != '/')
        httpClient.pendingRedirect = router.currentRoute.value.fullPath;
      localStorage.setItem('token', '');
      router.push({ name: 'Login' });
      return Promise.resolve({});
    }
    return Promise.reject(error);
  }
);

export default httpClient;
