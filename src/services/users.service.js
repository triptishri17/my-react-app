import axios from "axios";

const NEW_ADMIN_API_URL =
  import.meta.env.VITE_API_URL || "https://backend-sv9r.onrender.com";

/* ================= COMMON CONFIG ================= */
const getAuthConfig = (token, isMultipart = false) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    ...(isMultipart && { "Content-Type": "multipart/form-data" }),
  },
});

export const getAllUsersList = async (token) => {
  try {
    const res = await axios.get(
      `${NEW_ADMIN_API_URL}/auth/user/all`,
      getAuthConfig(token)
    );
    return res.data;
  } catch (error) {
    console.error("Get users error:", error.response?.data || error.message);
    throw error;
  }
};
  

/* ================= CREATE USER ================= */
export const createUser = async (data, token) => {
  try {
    const res = await axios.post(
      `${NEW_ADMIN_API_URL}/auth/user/create`,
      data,
      getAuthConfig(token, false) // 👈 JSON bhej rahe hain
    );
    return res.data;
  } catch (error) {
    console.error("Create user error:", error.response?.data || error.message);
    throw error;
  }
};

/* ================= UPDATE USER ================= */
export const updateUser = async (id, data, token) => {
  try {
    const res = await axios.put(
      `${NEW_ADMIN_API_URL}/auth/user/admin-update/${id}`,
      data,
      getAuthConfig(token)
    );
    return res.data;
  } catch (error) {
    console.error("Update user error:", error.response?.data || error.message);
    throw error;
  }
};

/* ================= DELETE USER ================= */
export const adminDeleteUser = async (userId, token) => {
  try {
    const res = await axios.patch(
      `${NEW_ADMIN_API_URL}/auth/user/admin-delete/${userId}`,
      {},
      getAuthConfig(token)
    );
    return res.data;
  } catch (error) {
    console.error("Delete user error:", error.response?.data || error.message);
    throw error;
  }
};
