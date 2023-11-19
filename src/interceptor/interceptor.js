import axios from 'axios';
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 500) {
      // window.location.href = '/server-error/';
    }
    return Promise.reject(error);
  }
);
