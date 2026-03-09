
import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useEffect } from "react";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const allOrders = JSON.parse(localStorage.getItem("vanamitraOrders") || "[]");
      const userOrders = allOrders.filter(order => order.user === user.email);
      setOrders(userOrders);
    }
  }, [user]);

  return (
    <div className="container" style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#2e7d32" }}>Your Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {orders.map(order => (
            <div key={order.id} className="card" style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,.1)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Order #{order.id}</h3>
                <span style={{
                  padding: "5px 10px",
                  borderRadius: "4px",
                  background: order.status === "Delivered" ? "#4caf50" : order.status === "Shipped" ? "#ff9800" : "#2196f3",
                  color: "#fff",
                  fontSize: "12px"
                }}>
                  {order.status}
                </span>
              </div>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Total: ₹{order.total}</p>
              <p>Payment: {order.payment === "cod" ? "Cash on Delivery" : "UPI Paid"}</p>
              <div style={{ marginTop: "10px" }}>
                <strong>Items:</strong>
                <ul>
                  {order.items.map(item => (
                    <li key={item.id}>{item.name} x{item.qty} - ₹{item.price * item.qty}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
