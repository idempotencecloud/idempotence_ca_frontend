import axios from 'axios';
import router from './router';

let baseURL = 'http://localhost:8080';
if (!window.location.toString().includes('http://localhost')) {
  baseURL = 'https://api.ca.idempotence.io';
}

const httpClient = axios.create({
  baseURL, // Replace with your API base URL
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
    if (
      error.code != 'ERR_NETWORK' &&
      error.response.status === 401 &&
      router.currentRoute.value.fullPath != '/'
    ) {
      // Unauthorized error, token may have expired
      // You can also check for specific error messages from the API if needed
      httpClient.pendingRedirect = router.currentRoute.value.fullPath;
      localStorage.setItem('token', '');
      router.push({ name: 'Login' });
      return Promise.resolve({});
    }
    return Promise.reject(error);
  }
);

export default httpClient;
