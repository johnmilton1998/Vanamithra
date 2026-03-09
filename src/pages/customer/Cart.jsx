import { useCart } from "../../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container" style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#2e7d32" }}>Your Cart</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ display: "grid", gap: "15px", marginBottom: "30px" }}>
            {cart.map(item => (
              <div className="card" key={item.id} style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price} each</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    style={{ width: "60px", padding: "5px", borderRadius: "4px", border: "1px solid #ddd" }}
                  />
                  <button onClick={() => removeFromCart(item.id)} style={{
                    padding: "5px 10px",
                    border: "none",
                    background: "#f44336",
                    color: "#fff",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}>
                    Remove
                  </button>
                </div>
                <div>
                  <strong>Total: ₹{item.price * item.qty}</strong>
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
            <h3>Grand Total: ₹{total}</h3>
            <button
              className="btn"
              onClick={() => navigate("/checkout")}
              style={{
                padding: "15px 30px",
                borderRadius: "8px",
                border: "none",
                background: "#2e7d32",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                marginTop: "20px"
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