import axios, { AxiosError, AxiosInstance } from 'axios';

// simple in-memory token cache; swap for a more robust auth store later
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // allow refresh token via httpOnly cookie if used
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const original = error.config as any;

    // Attempt a single refresh/retry if backend supports /auth/refresh
    if (error.response?.status === 401 && !original?._retry) {
      original._retry = true;
      try {
        await api.post('/auth/refresh');
        return api(original);
      } catch {
        // fall through to normalized error
      }
    }

    const normalized = {
      status: error.response?.status ?? 0,
      code: (error.response?.data as any)?.code ?? 'UNKNOWN',
      message: (error.response?.data as any)?.message ?? error.message,
      details: (error.response?.data as any)?.errors
    };

    return Promise.reject(normalized);
  }
);

export default api;

