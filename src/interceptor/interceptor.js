// import LocalStorageService from "./LocalStorageService";
import config from "../config";
import axios from "axios";

// let localStorageService = LocalStorageService


axios.interceptors.request.use( config =>{
    return config;
  },
  error => {
    Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response
  }
  )
