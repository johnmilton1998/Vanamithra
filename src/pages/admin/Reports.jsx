import { useState, useEffect } from "react";
import db from "../../services/DatabaseService";

export default function Reports() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    monthlyOrders: 0,
    totalProducts: 0,
    orderStatuses: {}
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const statistics = db.getStatistics();
    const allOrders = db.getOrders();
    setStats(statistics);
    setOrders(allOrders);
  }, []);

  return (
    <div className="container">
      <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", marginBottom: "30px", color: "#2e7d32" }}>Reports & Analytics</h2>

      {/* Key Statistics */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "15px",
        marginBottom: "30px"
      }}>
        <div style={{
          padding: "20px",
          background: "#e8f5e8",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#2e7d32", fontSize: "14px" }}>Total Orders</h3>
          <p style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: "bold", margin: 0 }}>{stats.totalOrders}</p>
        </div>
        <div style={{
          padding: "20px",
          background: "#e8f5e8",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#2e7d32", fontSize: "14px" }}>Total Revenue</h3>
          <p style={{ fontSize: "clamp(18px, 5vw, 26px)", fontWeight: "bold", margin: 0 }}>₹{stats.totalRevenue}</p>
        </div>
        <div style={{
          padding: "20px",
          background: "#e8f5e8",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#2e7d32", fontSize: "14px" }}>Monthly Revenue</h3>
          <p style={{ fontSize: "clamp(18px, 5vw, 26px)", fontWeight: "bold", margin: 0 }}>₹{stats.monthlyRevenue}</p>
        </div>
        <div style={{
          padding: "20px",
          background: "#f3e5f5",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#2e7d32", fontSize: "14px" }}>This Month Orders</h3>
          <p style={{ fontSize: "clamp(18px, 5vw, 26px)", fontWeight: "bold", margin: 0 }}>{stats.monthlyOrders}</p>
        </div>
      </div>

      {/* Order Status Breakdown */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,.06)",
        marginBottom: "30px"
      }}>
        <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: "clamp(16px, 4vw, 20px)" }}>Order Status Breakdown</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "12px"
        }}>
          {Object.entries(stats.orderStatuses).map(([status, count]) => (
            <div key={status} style={{
              padding: "15px",
              background: "#f9f9f9",
              borderRadius: "4px",
              textAlign: "center",
              border: "2px solid #e0e0e0"
            }}>
              <strong style={{ fontSize: "13px" }}>{status}</strong>
              <p style={{ margin: "8px 0 0 0", fontSize: "clamp(14px, 4vw, 18px)", color: "#2e7d32", fontWeight: "bold" }}>
                {count}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,.06)",
        overflowX: "auto"
      }}>
        <h3 style={{ marginTop: 0, marginBottom: "15px", fontSize: "clamp(16px, 4vw, 20px)" }}>Recent Orders</h3>
        {orders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", margin: 0 }}>No orders yet</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "600px"
            }}>
              <thead>
                <tr style={{ background: "#f0f0f0" }}>
                  <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left", fontSize: "13px" }}>Order ID</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left", fontSize: "13px" }}>User</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left", fontSize: "13px" }}>Total</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left", fontSize: "13px" }}>Status</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left", fontSize: "13px" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(-20).reverse().map(order => (
                  <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px", border: "1px solid #ddd", fontSize: "12px" }}>{order.id}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd", fontSize: "12px" }}>{order.user}</td>
                    <td style={{ padding: "12px", border: "1px solid #ddd", fontSize: "12px", fontWeight: "bold" }}>₹{order.total}</td>
                    <td style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      fontSize: "12px",
                      color: order.status === "Delivered" ? "#4caf50" : order.status === "Shipped" ? "#ff9800" : "#2196f3"
                    }}>
                      {order.status}
                    </td>
                    <td style={{ padding: "12px", border: "1px solid #ddd", fontSize: "12px" }}>
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}