import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../../services/DatabaseService";
import toast from "react-hot-toast";
import "./checkout.css";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [payment, setPayment] = useState("cod");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const advance = Math.round(total * 0.1);
  const remaining = total - advance;

  const placeOrder = async () => {
    if (!user) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    // Validate address
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) {
      toast.error("Please fill all required fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);

    try {
      // Create order
      const order = {
        items: cart,
        total,
        payment,
        address,
        user: user.email,
        userName: user.name || user.email.split("@")[0]
      };

      // Save to database
      const savedOrder = db.addOrder(order);

      // Show success message
      toast.success("Order placed successfully!");

      // WhatsApp message
      const whatsappMessage = `New Order from ${user.name || user.email}:
Order ID: ${savedOrder.id}
Items: ${cart.map(item => `${item.name} x${item.qty}`).join(", ")}
Total: ₹${total}
Payment: ${payment === "cod" ? `COD (Advance: ₹${advance})` : "UPI Paid"}
Address: ${address.line1}${address.line2 ? ", " + address.line2 : ""}
${address.city}, ${address.state} ${address.pincode}`;

      const whatsappUrl = `https://wa.me/918870859460?text=${encodeURIComponent(whatsappMessage)}`;

      // Send notifications
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        toast.success(`Invoice sent to ${user.email}`);
      }, 500);

      // Clear cart and redirect
      clearCart();
      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    } catch (error) {
      toast.error("Error placing order. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "40px 20px" }}>
        <h2 style={{ color: "#2e7d32" }}>Your cart is empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="btn"
          style={{
            padding: "12px 24px",
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px"
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", marginBottom: "30px" }}>Checkout</h2>

      <div className="checkout-grid">
        {/* Address */}
        <div className="card">
          <h3 style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>📍 Shipping Address</h3>
          <input name="name" placeholder="Full Name *" value={address.name} onChange={handleChange}/>
          <input name="phone" placeholder="Mobile Number *" value={address.phone} onChange={handleChange}/>
          <input name="email" placeholder="Email" value={address.email} onChange={handleChange}/>
          <input name="line1" placeholder="Address Line 1 *" value={address.line1} onChange={handleChange}/>
          <input name="line2" placeholder="Address Line 2 (Optional)" value={address.line2} onChange={handleChange}/>
          <input name="city" placeholder="City *" value={address.city} onChange={handleChange}/>
          <input name="state" placeholder="State" value={address.state} onChange={handleChange}/>
          <input name="pincode" placeholder="Pincode *" value={address.pincode} onChange={handleChange}/>
        </div>

        {/* Order Summary */}
        <div className="card">
          <h3 style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>📦 Order Summary</h3>
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {cart.map(item => (
              <div key={item.id} className="row" style={{ marginBottom: "10px" }}>
                <span style={{ fontSize: "13px" }}>{item.name} × {item.qty}</span>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <hr style={{ margin: "15px 0" }}/>
          <div className="row" style={{ marginBottom: "20px" }}>
            <b style={{ fontSize: "clamp(14px, 3vw, 16px)" }}>Total</b>
            <b style={{ fontSize: "clamp(16px, 4vw, 20px)", color: "#2e7d32" }}>₹{total}</b>
          </div>

          {/* Payment */}
          <h3 style={{marginTop: "20px", marginBottom: "15px", fontSize: "clamp(16px, 4vw, 20px)"}}>💳 Payment Method</h3>

          <label className="pay-option">
            <input
              type="radio"
              checked={payment==="cod"}
              onChange={()=>setPayment("cod")}
            />
            <span style={{ marginLeft: "8px" }}>Cash on Delivery</span>
          </label>

          {payment==="cod" && (
            <div className="cod-box">
              <p>💰 Advance Payment (10%): <strong>₹{advance}</strong></p>
              <p>💳 Remaining on Delivery: <strong>₹{remaining}</strong></p>
            </div>
          )}

          <label className="pay-option">
            <input
              type="radio"
              checked={payment==="upi"}
              onChange={()=>setPayment("upi")}
            />
            <span style={{ marginLeft: "8px" }}>UPI Payment</span>
          </label>

          {payment==="upi" && (
            <div className="upi-box">
              <p>Scan & Pay via any UPI app</p>
              <div className="qr">QR CODE</div>
            </div>
          )}

          <button
            className="btn"
            onClick={placeOrder}
            disabled={isLoading}
            style={{
              padding: "12px 24px",
              background: isLoading ? "#ccc" : "#2e7d32",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "clamp(14px, 3vw, 16px)",
              marginTop: "20px",
              width: "100%",
              fontWeight: "bold"
            }}
          >
            {isLoading ? "⏳ Processing..." : "✓ Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}