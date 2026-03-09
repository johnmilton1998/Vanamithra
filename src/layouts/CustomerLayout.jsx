
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useState } from "react";
import "./CustomerLayout.css";

export default function CustomerLayout() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (pathname) => location.pathname === pathname;

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header with Logo and Navbar */}
      <header className="header">
        {/* Logo and Brand */}
        <div className="logo-container">
          <img src="/logo.png" alt="Vanamitra Logo" className="logo" />
          <div className="brand-name">🌿 Vanamitra</div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        {/* Navbar */}
        <nav className={`navbar ${mobileMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={handleCloseMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`nav-link ${isActive("/products") ? "active" : ""}`}
            onClick={handleCloseMobileMenu}
          >
            Products
          </Link>
          <Link
            to="/shop"
            className={`nav-link ${isActive("/shop") ? "active" : ""}`}
            onClick={handleCloseMobileMenu}
          >
            Shop
          </Link>
          <Link
            to="/orders"
            className={`nav-link ${isActive("/orders") ? "active" : ""}`}
            onClick={handleCloseMobileMenu}
          >
            Orders
          </Link>
          <Link
            to="/track"
            className={`nav-link ${isActive("/track") ? "active" : ""}`}
            onClick={handleCloseMobileMenu}
          >
            Track
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${isActive("/contact") ? "active" : ""}`}
            onClick={handleCloseMobileMenu}
          >
            Contact
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
            onClick={handleCloseMobileMenu}
          >
            About
          </Link>
          <Link
            to="/help"
            className={`nav-link ${isActive("/help") ? "active" : ""}`}
            onClick={handleCloseMobileMenu}
          >
            Help
          </Link>
          <Link
            to="/cart"
            className={`nav-link ${isActive("/cart") ? "active" : ""}`}
            onClick={handleCloseMobileMenu}
          >
            Cart ({cart.length})
          </Link>
          {user ? (
            <>
              <span className="user-info">👤 {user.name || user.email?.split("@")[0]}</span>
              <button
                className="logout-btn"
                onClick={() => {
                  logout();
                  handleCloseMobileMenu();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`nav-link ${isActive("/login") ? "active" : ""}`}
              onClick={handleCloseMobileMenu}
            >
              Login
            </Link>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Vanamitra. All rights reserved.</p>
      </footer>
    </>
  );
}
