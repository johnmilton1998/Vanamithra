
import { useState } from "react";

export default function Track() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);

  const trackOrder = () => {
    const allOrders = JSON.parse(localStorage.getItem("vanamitraOrders") || "[]");
    const foundOrder = allOrders.find(o => o.id === orderId);
    setOrder(foundOrder || null);
  };

  return (
    <div className="container" style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px", color: "#2e7d32" }}>Track Your Order</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
        />
        <button onClick={trackOrder} style={{
          padding: "10px 20px",
          borderRadius: "4px",
          border: "none",
          background: "#2e7d32",
          color: "#fff",
          cursor: "pointer"
        }}>
          Track
        </button>
      </div>

      {order ? (
        <div className="card" style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,.1)"
        }}>
          <h3>Order #{order.id}</h3>
          <p>Status: <strong>{order.status}</strong></p>
          <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          <p>Total: ₹{order.total}</p>
          <div style={{ marginTop: "20px" }}>
            <h4>Tracking Timeline</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: order.status === "Pending" || order.status === "Confirmed" || order.status === "Shipped" || order.status === "Delivered" ? "#4caf50" : "#ddd"
                }}></div>
                <span>Order Placed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: order.status === "Confirmed" || order.status === "Shipped" || order.status === "Delivered" ? "#4caf50" : "#ddd"
                }}></div>
                <span>Order Confirmed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: order.status === "Shipped" || order.status === "Delivered" ? "#4caf50" : "#ddd"
                }}></div>
                <span>Shipped</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: order.status === "Delivered" ? "#4caf50" : "#ddd"
                }}></div>
                <span>Delivered</span>
              </div>
            </div>
          </div>
        </div>
      ) : orderId && (
        <p style={{ textAlign: "center", color: "#f44336" }}>Order not found. Please check your Order ID.</p>
      )}
    </div>
  );
}
