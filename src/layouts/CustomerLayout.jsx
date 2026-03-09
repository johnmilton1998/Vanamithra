
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function CustomerLayout() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();

  return (
    <>
      {/* Header with Logo and Navbar */}
      <header style={{
        position: "sticky",
        top: 0,
        background: "#fff",
        padding: "12px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,.05)",
        zIndex: 1000
      }}>
        {/* Logo and Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="Vanamitra Logo" style={{ height: "40px", width: "40px" }} />
          <div style={{ fontWeight: 700, color: "#2e7d32", fontSize: "24px" }}>🌿 Vanamitra</div>
        </div>

        {/* Navbar */}
        <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none", color: location.pathname === "/" ? "#2e7d32" : "#333", fontWeight: location.pathname === "/" ? "bold" : "normal" }}>Home</Link>
          <Link to="/products" style={{ textDecoration: "none", color: location.pathname === "/products" ? "#2e7d32" : "#333", fontWeight: location.pathname === "/products" ? "bold" : "normal" }}>Products</Link>
          <Link to="/shop" style={{ textDecoration: "none", color: location.pathname === "/shop" ? "#2e7d32" : "#333", fontWeight: location.pathname === "/shop" ? "bold" : "normal" }}>Shop</Link>
          <Link to="/orders" style={{ textDecoration: "none", color: location.pathname === "/orders" ? "#2e7d32" : "#333", fontWeight: location.pathname === "/orders" ? "bold" : "normal" }}>Orders</Link>
          <Link to="/track" style={{ textDecoration: "none", color: location.pathname === "/track" ? "#2e7d32" : "#333", fontWeight: location.pathname === "/track" ? "bold" : "normal" }}>Track Order</Link>
          <Link to="/contact" style={{ textDecoration: "none", color: location.pathname === "/contact" ? "#2e7d32" : "#333", fontWeight: location.pathname === "/contact" ? "bold" : "normal" }}>Contact</Link>
          <Link to="/about" style={{ textDecoration: "none", color: location.pathname === "/about" ? "#2e7d32" : "#333", fontWeight: location.pathname === "/about" ? "bold" : "normal" }}>About</Link>
          <Link to="/help" style={{ textDecoration: "none", color: location.pathname === "/help" ? "#2e7d32" : "#333", fontWeight: location.pathname === "/help" ? "bold" : "normal" }}>Help</Link>
          <Link to="/cart" style={{ textDecoration: "none", color: "#333", position: "relative" }}>
            Cart ({cart.length})
          </Link>
          {user ? (
            <>
              <span>👤 {user.name || user.email}</span>
              <button onClick={logout} style={{ padding: "8px 16px", border: "none", background: "#2e7d32", color: "#fff", borderRadius: "4px", cursor: "pointer" }}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none", color: "#333" }}>Login</Link>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        background: "#2e7d32",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        marginTop: "auto"
      }}>
        <p>&copy; 2026 Vanamitra. All rights reserved.</p>
      </footer>
    </>
  );
}
