import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import toast from "react-hot-toast";
import "./admin-login.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!password.trim()) {
      toast.error("Please enter the admin password");
      return;
    }

    setIsLoading(true);
    
    // Simulate delay for security
    setTimeout(() => {
      if (login(password)) {
        toast.success("✅ Admin login successful!");
        setPassword("");
        setTimeout(() => navigate("/admin"), 500);
      } else {
        toast.error("❌ Incorrect password. Try again!");
        setPassword("");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-header">
          <h1>🔐 Admin Portal</h1>
          <p>Vanamitra Management System</p>
        </div>

        <div className="admin-form">
          <label htmlFor="password">Admin Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            disabled={isLoading}
            autoFocus
          />

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`admin-login-btn ${isLoading ? "loading" : ""}`}
          >
            {isLoading ? "⏳ Logging in..." : "🔓 Login"}
          </button>

          <div className="admin-info">
            <p>👤 <strong>Admin Email:</strong> admin@vanamitra.com</p>
            <p style={{ fontSize: "12px", color: "#999", marginTop: "10px" }}>
              * Keep your password secure and change it regularly
            </p>
          </div>
        </div>

        <div className="admin-footer">
          <button
            onClick={() => navigate("/")}
            className="back-btn"
          >
            ← Back to Store
          </button>
        </div>
      </div>
    </div>
  );
}
