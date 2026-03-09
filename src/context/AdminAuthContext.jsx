import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

// 🔐 Admin credentials - Change this to your secure password
const ADMIN_PASSWORD = "John@199798"; // Change this!
const ADMIN_EMAIL = "karthikpriyanm4@gmail.com";

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("vanamitraAdmin");
    if (saved) {
      setAdmin(JSON.parse(saved));
    }
  }, []);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      const adminUser = { 
        email: ADMIN_EMAIL, 
        role: "admin",
        loginTime: new Date().toISOString()
      };
      setAdmin(adminUser);
      localStorage.setItem("vanamitraAdmin", JSON.stringify(adminUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("vanamitraAdmin");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, isAdmin: !!admin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
