import axios from "axios";

/**
 * Axios Instance
 */
const API = axios.create({
  baseURL:import.meta.env.VITE_API_URL  || "https://backend-sv9r.onrender.com", //"http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach token automatically to every request
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * AuthService
 */
const AuthService = {
  /**
   * LOGIN USER
   */
  login: async (email, password) => {
    try {
      const res = await API.post("/auth/user/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // ✅ Save JWT + user
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return res.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Login failed"
      );
    }
  },

  /**
   * LOGOUT USER
   */
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  /**
   * GET CURRENT USER
   */
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  /**
   * CHECK AUTH
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  /**
   * GET TOKEN
   */
  getToken: () => {
    return localStorage.getItem("token");
  },
};

export default AuthService;
