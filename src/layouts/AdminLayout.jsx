
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";
import "./AdminLayout.css";

export default function AdminLayout(){
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-container">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰ Menu
      </button>

      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? "active" : ""}`}>
        <h3>Admin Panel</h3>
        <div className="admin-info-box">
          <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>👤 Logged in as:</p>
          <p style={{ fontSize: "13px", margin: "0", fontWeight: "bold", color: "#2e7d32" }}>{admin?.email}</p>
        </div>
        <div className="admin-links">
          <Link 
            to="/admin" 
            className="admin-link"
            onClick={() => setSidebarOpen(false)}
          >
            📊 Dashboard
          </Link>
          <Link 
            to="/admin/products" 
            className="admin-link"
            onClick={() => setSidebarOpen(false)}
          >
            📦 Products
          </Link>
          <Link 
            to="/admin/orders" 
            className="admin-link"
            onClick={() => setSidebarOpen(false)}
          >
            🛒 Orders
          </Link>
          <Link 
            to="/admin/reports" 
            className="admin-link"
            onClick={() => setSidebarOpen(false)}
          >
            📈 Reports
          </Link>
          <button 
            className="admin-link logout-btn"
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <Outlet/>
      </div>
    </div>
  )
}
