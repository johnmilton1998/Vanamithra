import { useCart } from "../../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#2e7d32" }}>Your Cart</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ display: "grid", gap: "15px", marginBottom: "30px" }}>
            {cart.map(item => (
              <div className="card" key={item.id} style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,.1)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
                alignItems: "center"
              }}>
                <div>
                  <h3 style={{ marginTop: 0, fontSize: "clamp(16px, 4vw, 20px)" }}>{item.name}</h3>
                  <p style={{ marginBottom: 0 }}>₹{item.price} each</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    style={{ width: "50px", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", fontSize: "14px" }}
                  />
                  <button onClick={() => removeFromCart(item.id)} style={{
                    padding: "8px 12px",
                    border: "none",
                    background: "#f44336",
                    color: "#fff",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    whiteSpace: "nowrap"
                  }}>
                    Remove
                  </button>
                </div>
                <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
                  <strong style={{ fontSize: "clamp(14px, 3vw, 16px)" }}>Total: ₹{item.price * item.qty}</strong>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,.1)",
            textAlign: "center"
          }}>
            <h3 style={{ fontSize: "clamp(18px, 4vw, 24px)" }}>Grand Total: ₹{total}</h3>
            <button
              className="btn"
              onClick={() => navigate("/checkout")}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                background: "#2e7d32",
                color: "#fff",
                fontSize: "clamp(14px, 3vw, 16px)",
                cursor: "pointer",
                marginTop: "20px",
                width: "100%",
                maxWidth: "300px"
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}