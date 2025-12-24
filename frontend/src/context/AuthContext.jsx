import { createContext, useContext, useEffect, useState } from "react";
import { loginApi } from "../services/auth.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("accessToken") || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setUser({});
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const res = await loginApi(email, password);

    localStorage.setItem("accessToken", res.accessToken);
    setToken(res.accessToken);
    setUser(res.user);

    return res.user;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
