import axios from 'axios';
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const isProduction = process.env.REACT_APP_PRODUCTION === 'True';
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isProduction && error.response.status === 500) {
      window.location.href = '/server-error/';
    }
    return Promise.reject(error);
  }
);
