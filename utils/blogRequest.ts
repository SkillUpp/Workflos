import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://blog.aitracker.ai",
  timeout: 5000,
  // withCredentials: true,
});

interface CustomAxiosError extends AxiosError {
  response: AxiosResponse;
}

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: CustomAxiosError) => {
    if (error.response) {
      console.log(error, "error");
    }
  }
);

export default api;
