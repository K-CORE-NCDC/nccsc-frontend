import axios from 'axios';
import config from '../config';
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
      window.location.href = `${config.basename}server-error/`;
    }
    return Promise.reject(error);
  }
);
