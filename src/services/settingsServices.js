import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const updateProfile = (data) =>
  API.put("/settings/profile", data);

export const updatePassword = (data) =>
  API.put("/settings/password", data);

export const savePreferences = (data) =>
  API.put("/settings/preferences", data);

export const deleteAccount = () =>
  API.delete("/settings/delete");