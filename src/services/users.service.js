import axios from "axios";

const API_URL = "http://localhost:5000/auth/user";

const NEW_ADMIN_API_URL = "http://localhost:5000/"

const newToken = localStorage.getItem("token")
console.log(newToken,"newToken")
/* ================= COMMON CONFIG ================= */
const getAuthConfig = (token, isMultipart = false) => ({
    headers: {
        Authorization: `Bearer ${token}`,
        ...(isMultipart && { "Content-Type": "multipart/form-data" }),
    },
});

/* ================= GET ALL USERS ================= */
export const getAllUsersList = async (token) => {
    try {
        const res = await axios.get(`${API_URL}/all`, getAuthConfig(token));
        return res.data;
    } catch (error) {
        console.error("Get users error:", error.response?.data || error.message);
        throw error;
    }
};

/* ================= CREATE USER ================= */
/**
 * @param {FormData} data
 * @param {string} token
 */
export const createUser = async (data, token) => {
    try {
        const res = await axios.post(
            `${API_URL}/create`,
            data,
            getAuthConfig(token, true)
        );
        return res.data;
    } catch (error) {
        console.error("Create user error:", error.response?.data || error.message);
        throw error;
    }
};

/* ================= UPDATE USER ================= */
/**
 * @param {string} id
 * @param {FormData} data
 * @param {string} token
 */
export const updateUser = async (id, data, token) => {
    try {
        console.log(token,"token")
        const res = await axios.put(
            `${NEW_ADMIN_API_URL}auth/user/admin-update/${id}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${newToken}`,

                }
            },
        );
        console.log(res, "res")
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
            `${API_URL}/admin-delete/${userId}`,
            {},
            getAuthConfig(token)
        );
        return res.data;
    } catch (error) {
        console.error("Delete user error:", error.response?.data || error.message);
        throw error;
    }
};
