
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 100%)", padding: "40px" }}>
      <div style={{
        textAlign: "center",
        maxWidth: "800px",
        background: "#fff",
        padding: "60px",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,.1)",
        animation: "fadeIn 1s ease-in"
      }}>
        <h1 style={{
          fontSize: "48px",
          color: "#2e7d32",
          marginBottom: "20px",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,.1)"
        }}>
          🌿 Pure Nature. Premium Care.
        </h1>
        <p style={{
          fontSize: "20px",
          color: "#555",
          marginBottom: "40px",
          lineHeight: "1.6"
        }}>
          Natural Oils & Soaps for Healthy Living. Discover our premium collection of organic products crafted with care.
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/products" style={{
            padding: "15px 30px",
            borderRadius: "50px",
            background: "#2e7d32",
            color: "#fff",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(46, 125, 50, 0.3)",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Explore Products
          </Link>
          <Link to="/about" style={{
            padding: "15px 30px",
            borderRadius: "50px",
            background: "transparent",
            color: "#2e7d32",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "bold",
            border: "2px solid #2e7d32",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#2e7d32"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2e7d32"; }}
          >
            Learn More
          </Link>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
