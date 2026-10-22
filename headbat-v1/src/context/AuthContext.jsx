import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

const AuthContext = createContext({
  admin: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  changePassword: async () => {},
  updateProfile: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("headbat_admin_token"));
  const [isLoading, setIsLoading] = useState(true);

  // Check current admin on mount or token change
  const checkAuth = useCallback(async () => {
    const storedToken = localStorage.getItem("headbat_admin_token");
    if (!storedToken) {
      setAdmin(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.getMe();
      if (res?.success && res.admin) {
        setAdmin(res.admin);
        setToken(storedToken);
      } else {
        localStorage.removeItem("headbat_admin_token");
        setAdmin(null);
        setToken(null);
      }
    } catch (err) {
      console.warn("[AuthContext] Session expired or invalid:", err.message);
      localStorage.removeItem("headbat_admin_token");
      setAdmin(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    if (res?.success && res.token) {
      localStorage.setItem("headbat_admin_token", res.token);
      setToken(res.token);
      setAdmin(res.admin);
      return res;
    }
    throw new Error(res?.message || "Login failed");
  };

  const logout = () => {
    localStorage.removeItem("headbat_admin_token");
    setToken(null);
    setAdmin(null);
  };

  const changePassword = async (currentPassword, newPassword) => {
    return await api.changePassword(currentPassword, newPassword);
  };

  const updateProfile = async (profileData) => {
    const res = await api.updateProfile(profileData);
    if (res?.success && res.admin) {
      setAdmin(res.admin);
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token && !!admin,
        isLoading,
        login,
        logout,
        changePassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
