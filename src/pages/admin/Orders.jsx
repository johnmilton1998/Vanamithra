
import { useState, useEffect } from "react";
import db from "../../services/DatabaseService";
import "./admin-styles.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const allOrders = db.getOrders();
    setOrders(allOrders);
  }, []);

  const updateStatus = (orderId, newStatus) => {
    db.updateOrderStatus(orderId, newStatus);
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
  };

  const deleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      db.deleteOrder(orderId);
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  const exportOrders = () => {
    db.downloadCSV("orders.csv");
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", margin: 0, color: "#2e7d32" }}>Manage Orders</h2>
        <button
          onClick={exportOrders}
          style={{
            padding: "10px 20px",
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            whiteSpace: "nowrap"
          }}
        >
          📥 Export to CSV
        </button>
      </div>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>No orders yet</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {orders.map(order => {
            const totalProducts = order.items?.reduce((sum, i) => sum + (i.qty || 0), 0) || 0;
            return (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                background: "#f9f9f9"
              }}
            >
              {/* Order Header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "15px",
                alignItems: "center",
                marginBottom: "15px"
              }}>
                <div>
                  <h3 style={{ fontSize: "clamp(14px, 3vw, 18px)", margin: "0 0 5px 0" }}>
                    Order #{order.id}
                  </h3>
                  <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>
                    {new Date(order.date).toLocaleDateString()} • {order.user}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#444" }}>
                    🛍️ Products: {totalProducts}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ddd",
                      fontSize: "12px"
                    }}
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    style={{
                      padding: "8px 12px",
                      background: "#f44336",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Order Details */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "15px",
                marginBottom: "15px",
                fontSize: "13px"
              }}>
                <div>
                  <strong>Total:</strong> ₹{order.total}
                </div>
                <div>
                  <strong>Payment:</strong> {order.payment === "cod" ? "Cash on Delivery" : "UPI Paid"}
                </div>
                <div>
                  <strong>Status:</strong> <span style={{ color: "#2e7d32", fontWeight: "bold" }}>{order.status}</span>
                </div>
              </div>

              {/* Expandable Items */}
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                style={{
                  background: "#e0e0e0",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "12px",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                {expandedOrder === order.id ? "▼" : "▶"} Items ({order.items?.length || 0})
              </button>

              {expandedOrder === order.id && (
                <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid #ddd" }}>
                  {order.items?.map(item => (
                    <div key={item.id} style={{
                      padding: "10px",
                      background: "#fff",
                      marginBottom: "8px",
                      borderRadius: "4px",
                      fontSize: "13px"
                    }}>
                      <strong>{item.name}</strong> (x{item.qty}) - ₹{item.price * item.qty}
                    </div>
                  ))}
                  {order.address && (
                    <div style={{
                      padding: "10px",
                      background: "#f0f8f0",
                      marginTop: "10px",
                      borderRadius: "4px",
                      fontSize: "12px"
                    }}>
                      <strong>Delivery Address:</strong>
                      <p style={{ margin: "5px 0 0 0" }}>
                        {order.address.line1}
                        {order.address.line2 && `, ${order.address.line2}`}
                        <br />
                        {order.address.city}, {order.address.state} {order.address.pincode}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
          })}
        </div>
      )}
    </div>
  );
}
