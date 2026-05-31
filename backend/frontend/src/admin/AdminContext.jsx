import { createContext, useContext, useState, useMemo } from "react";

const AdminContext = createContext();

const DEMO_CREDENTIALS = {
  email: "admin@primebundle.com",
  password: "admin123",
};

const adminUser = {
  name: "Admin User",
  email: "admin@primebundle.com",
  role: "Super Admin",
  avatar: "AU",
  lastLogin: "2025-05-20 22:30",
};

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState("");

  const login = (email, password) => {
    if (
      email === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      setAdmin(adminUser);
      setError("");
      return true;
    }
    setError("Invalid email or password. Use admin@primebundle.com / admin123");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
    setError("");
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      admin,
      error,
      login,
      logout,
      clearError: () => setError(""),
    }),
    [isAuthenticated, admin, error],
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}

export default AdminContext;
