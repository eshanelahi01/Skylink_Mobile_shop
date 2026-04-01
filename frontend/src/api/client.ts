import axios from "axios";

const normalizeApiBaseUrl = (value: string) => value.replace(/\/+$/, "");

const resolveApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return normalizeApiBaseUrl(configuredUrl);
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:5000/api";
    }
  }

  return "/api";
};

export const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 8000,
  headers: {
    Accept: "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("skylink_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
