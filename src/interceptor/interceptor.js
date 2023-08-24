import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use((response) => {
  return response;
});
