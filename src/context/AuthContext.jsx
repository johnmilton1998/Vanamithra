import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("vanamitraUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (email, password) => {
    // 🔹 Replace with API later
    const fakeUser = { email };
    setUser(fakeUser);
    localStorage.setItem("vanamitraUser", JSON.stringify(fakeUser));
  };

  const register = (name, email, password, phone) => {
    // 🔹 Replace with API later
    const newUser = { name, email, phone };
    setUser(newUser);
    localStorage.setItem("vanamitraUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vanamitraUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);