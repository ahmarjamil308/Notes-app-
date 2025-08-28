import { createContext, useState, useContext, useEffect } from "react";
import { getUserFromToken } from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Read token on app load
  useEffect(() => {
    const currentUser = getUserFromToken();
    if (currentUser) {
      setUser(currentUser);
      setRole(currentUser.role);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setRole(userData.role);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
