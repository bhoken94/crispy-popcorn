import Axios, { InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
    config.headers.Authorization = `Bearer ${env.TMDB_API_KEY}`;
  }

  return config;
}

export const api = Axios.create({
  baseURL: env.TMDB_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    // useNotifications.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });
    console.error(message);

    if (error.response?.status === 401) {
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);
