import { useCart } from "../../context/CartContext.jsx";

const products = [
  { id: 1, name: "Coconut Oil", price: 249, description: "Pure organic coconut oil", image: "/coconut-oil.jpg" },
  { id: 2, name: "Groundnut Oil", price: 299, description: "Healthy groundnut oil", image: "/groundnut-oil.jpg" },
  { id: 3, name: "Herbal Oils", price: 349, description: "Blend of natural herbs", image: "/herbal-oil.jpg" },
  { id: 4, name: "Combo Packs", price: 499, description: "Assorted oil packs", image: "/combo-pack.jpg" }
];

export default function Products() {
  const { addToCart } = useCart();

  return (
    <div className="container" style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#2e7d32" }}>Our Premium Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {products.map(p => (
          <div className="card" key={p.id} style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,.1)",
            textAlign: "center",
            transition: "transform 0.3s",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img src={p.image} alt={p.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#2e7d32" }}>₹{p.price}</p>
            <button className="btn" onClick={() => addToCart(p)} style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#2e7d32",
              color: "#fff",
              cursor: "pointer",
              fontSize: "16px"
            }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}