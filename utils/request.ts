import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  // baseURL: "https://api-dev.skillupp.xyz",
  baseURL: "https://api.aitracker.ai",
  timeout: 5000,
  withCredentials: true,
});

interface CustomAxiosError extends AxiosError {
  response: AxiosResponse;
}

api.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response: { data: any; }) => {
    if (response.data) {
      const data = response.data;
      return data;
    }
  },
  (error: CustomAxiosError) => {
    if (error.response) {
      
    }
  }
);

export default api;
