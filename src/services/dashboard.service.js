import axios from "axios";

const API_URL = "http://localhost:5000/dashboard";

export const getDashboardStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
