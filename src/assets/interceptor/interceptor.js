import React from 'react';
import LocalStorageService from "./LocalStorageService";
import config from "../../config";
import axios from "axios";

let localStorageService = LocalStorageService


axios.interceptors.request.use( config =>{
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer '+token;
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  error => {
    Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response
  },
  function (error){
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry){
      originalRequest._retry = true;
      axios.post(config.auth+'api/token/refresh/',{
        "refresh":localStorageService.getRefreshToken()
      }).then((res) => {
        if (res) {
          let d = res['data'];
          d['refresh'] = localStorageService.getRefreshToken()
          localStorageService.setToken(res.data);
          axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorageService.getAccessToken();
          window.location.reload(true);
          return axios(originalRequest);
        }
      }).catch((error) => {

        localStorageService.clearToken()
        window.location.href = '/'
      })

    } else if (error.response.status === 409) {
      return error.response
    }
    return Promise.reject(error);
  })
