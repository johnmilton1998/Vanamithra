import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    city: "",
    pincode: ""
  });

  const [payment, setPayment] = useState("cod");

  const handleChange = e =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const advance = Math.round(total * 0.1);
  const remaining = total - advance;

  const placeOrder = () => {
    if (!user) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }

    // Generate order
    const orderId = "ORD" + Date.now();
    const order = {
      id: orderId,
      items: cart,
      total,
      payment,
      address,
      status: "Pending",
      date: new Date().toISOString(),
      user: user.email
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem("vanamitraOrders") || "[]");
    orders.push(order);
    localStorage.setItem("vanamitraOrders", JSON.stringify(orders));

    // WhatsApp message
    const whatsappMessage = `New Order from ${user.name || user.email}:
Order ID: ${orderId}
Items: ${cart.map(item => `${item.name} x${item.qty}`).join(", ")}
Total: ₹${total}
Payment: ${payment === "cod" ? `COD (Advance: ₹${advance})` : "UPI Paid"}
Address: ${address.line1}, ${address.city}, ${address.pincode}`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    // Email invoice simulation
    alert(`Invoice sent to ${user.email}!`);

    clearCart();
    navigate("/orders");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-grid">
        {/* Address */}
        <div className="card">
          <h3>Shipping Address</h3>
          <input name="name" placeholder="Full Name" value={address.name} onChange={handleChange}/>
          <input name="phone" placeholder="Mobile Number" value={address.phone} onChange={handleChange}/>
          <input name="email" placeholder="Email" value={address.email} onChange={handleChange}/>
          <input name="line1" placeholder="Address Line" value={address.line1} onChange={handleChange}/>
          <input name="city" placeholder="City" value={address.city} onChange={handleChange}/>
          <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleChange}/>
        </div>

        {/* Order Summary */}
        <div className="card">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="row">
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr/>
          <div className="row"><b>Total</b><b>₹{total}</b></div>

          {/* Payment */}
          <h3 style={{marginTop:20}}>Payment Method</h3>

          <label className="pay-option">
            <input
              type="radio"
              checked={payment==="cod"}
              onChange={()=>setPayment("cod")}
            />
            Cash on Delivery
          </label>

          {payment==="cod" && (
            <div className="cod-box">
              <p>Advance Payment (10%): ₹{advance}</p>
              <p>Remaining on Delivery: ₹{remaining}</p>
            </div>
          )}

          <label className="pay-option">
            <input
              type="radio"
              checked={payment==="upi"}
              onChange={()=>setPayment("upi")}
            />
            UPI Payment
          </label>

          {payment==="upi" && (
            <div className="upi-box">
              <p>Scan & Pay via any UPI app</p>
              <div className="qr">QR CODE</div>
            </div>
          )}

          <button className="btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}