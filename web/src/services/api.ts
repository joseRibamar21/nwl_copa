import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/"
});

api.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    sessionStorage.removeItem('token')
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
  console.log(response)

  return response;
}, function (error) {
  console.log(error)
  if (error.response.status === 401) {

  }
});
