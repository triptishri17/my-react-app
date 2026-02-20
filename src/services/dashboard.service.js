import axios from "axios";

const API_URL = "https://backend-sv9r.onrender.com/dashboard";

export const getDashboardStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
