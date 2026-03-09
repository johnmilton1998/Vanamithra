
import { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("vanamitraOrders") || "[]");
    setOrders(allOrders);
  }, []);

  const updateStatus = (orderId, newStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem("vanamitraOrders", JSON.stringify(updated));
  };

  const exportToExcel = () => {
    // Simulate Excel export
    const csv = orders.map(o => `${o.id},${o.user},${o.total},${o.status},${o.date}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <button onClick={exportToExcel} style={{ marginBottom: "20px", padding: "10px 20px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: "4px" }}>
        Export to Excel
      </button>

      <div style={{ display: "grid", gap: "15px" }}>
        {orders.map(order => (
          <div key={order.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", background: "#f9f9f9" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3>Order #{order.id}</h3>
              <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} style={{ padding: "5px" }}>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>
            <p>User: {order.user}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <p>Total: ₹{order.total}</p>
            <p>Payment: {order.payment === "cod" ? "Cash on Delivery" : "UPI Paid"}</p>
            <div>
              <strong>Items:</strong>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>{item.name} x{item.qty} - ₹{item.price * item.qty}</li>
                ))}
              </ul>
            </div>
            {order.address && (
              <div>
                <strong>Address:</strong> {order.address.line1}, {order.address.city}, {order.address.pincode}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
