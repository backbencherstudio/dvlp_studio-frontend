import axios from "axios";
import Cookies from "js-cookie";

export const publicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Private Axios with interceptor
export const privateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  
});

// Add Authorization header automatically
privateAxios.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token if 401
privateAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const isMockAuth = process.env.NEXT_PUBLIC_MOCK_AUTH === "true";
    if (isMockAuth) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refresh_token");
        if (!refreshToken) throw new Error("No refresh token");

        const res = await publicAxios.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data.access_token;
        Cookies.set("access_token", newAccessToken, {
          secure: true,
          sameSite: "strict",
        });

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateAxios(originalRequest);
      } catch (refreshError) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/"; // force logout
      }
    }
    return Promise.reject(error);
  }
);
