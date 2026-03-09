import { useCart } from "../../context/CartContext.jsx";


const products = [
  { id: 1, name: "Single Pack 1", price: 249, description: "Pure organic coconut oil", image: "/products/Pure organic coconut oil.png" },
  { id: 2, name: "Single Pack 2", price: 299, description: "Herbal Fresh blend", image: "/products/herbal fresh.png" },
  { id: 3, name: "Single Pack 3", price: 349, description: "Coconut Care premium", image: "/products/coconut care.png" },
  { id: 4, name: "Combo 1", price: 499, description: "Assorted oil combo pack", image: "/products/combo 1.png" },
  { id: 5, name: "Combo 2", price: 549, description: "Premium combo package", image: "/products/combo 2.png" },
  { id: 6, name: "Combo 3", price: 599, description: "Deluxe combo selection", image: "/products/combo 3.png" },
  { id: 7, name: "Family Combo Pack", price: 799, description: "Complete family bundle", image: "/products/glow bar.png" }
];

export default function Products() {
  const { addToCart } = useCart();

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#2e7d32", fontSize: "clamp(24px, 6vw, 48px)" }}>Our Premium Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map(p => (
          <div className="card" key={p.id} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,.1)",
            textAlign: "center",
            transition: "transform 0.3s",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img src={p.image} alt={p.name} style={{ width: "100%", height: "clamp(150px, 40vw, 250px)", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
            <h3 style={{ fontSize: "clamp(16px, 4vw, 20px)", margin: "10px 0" }}>{p.name}</h3>
            <p style={{ fontSize: "clamp(13px, 3vw, 14px)", margin: "8px 0", color: "#666" }}>{p.description}</p>
            <p style={{ fontSize: "clamp(16px, 4vw, 18px)", fontWeight: "bold", color: "#2e7d32", margin: "10px 0" }}>₹{p.price}</p>
            <button className="btn" onClick={() => addToCart(p)} style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#2e7d32",
              color: "#fff",
              cursor: "pointer",
              fontSize: "clamp(13px, 3vw, 16px)",
              width: "100%",
              boxSizing: "border-box"
            }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}