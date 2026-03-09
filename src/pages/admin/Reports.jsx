import { useState, useEffect } from "react";

export default function Reports() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, monthlyRevenue: 0 });

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("vanamitraOrders") || "[]");
    setOrders(allOrders);

    const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyOrders = allOrders.filter(o => {
      const orderDate = new Date(o.date);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });
    const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + o.total, 0);

    setStats({
      totalOrders: allOrders.length,
      totalRevenue,
      monthlyRevenue
    });
  }, []);

  return (
    <div>
      <h2>Reports & Analytics</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
        <div style={{ padding: "20px", background: "#e8f5e8", borderRadius: "8px", textAlign: "center" }}>
          <h3>Total Orders</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{stats.totalOrders}</p>
        </div>
        <div style={{ padding: "20px", background: "#e8f5e8", borderRadius: "8px", textAlign: "center" }}>
          <h3>Total Revenue</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>₹{stats.totalRevenue}</p>
        </div>
        <div style={{ padding: "20px", background: "#e8f5e8", borderRadius: "8px", textAlign: "center" }}>
          <h3>Monthly Revenue</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>₹{stats.monthlyRevenue}</p>
        </div>
      </div>

      <h3>Order Status Breakdown</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "30px" }}>
        {["Pending", "Confirmed", "Shipped", "Delivered"].map(status => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <div key={status} style={{ padding: "15px", background: "#f9f9f9", borderRadius: "4px", textAlign: "center" }}>
              <strong>{status}</strong>: {count}
            </div>
          );
        })}
      </div>

      <h3>Recent Orders</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Order ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>User</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Total</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(-10).reverse().map(order => (
            <tr key={order.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{order.id}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{order.user}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>₹{order.total}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{order.status}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{new Date(order.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}