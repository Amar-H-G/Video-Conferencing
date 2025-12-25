import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((res) => {
        setUser(res.user);
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("accessToken", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuth: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
