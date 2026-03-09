
import { useState, useEffect } from "react";
import db from "../../services/DatabaseService";

export default function Dashboard(){
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    monthlyOrders: 0,
    totalProducts: 0,
    orderStatuses: {}
  });

  useEffect(() => {
    const statistics = db.getStatistics();
    setStats(statistics);
  }, []);

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders, color: "#e3f2fd" },
    { label: "Total Revenue", value: `₹${stats.totalRevenue}`, color: "#e8f5e9" },
    { label: "Monthly Sales", value: `₹${stats.monthlyRevenue}`, color: "#fff3e0" },
    { label: "This Month Orders", value: stats.monthlyOrders, color: "#f3e5f5" },
    { label: "Total Products", value: stats.totalProducts, color: "#fce4ec" }
  ];

  return (
    <div className="container">
      <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", marginBottom: "30px", color: "#2e7d32" }}>Admin Dashboard</h2>
      
      {/* Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "40px"
      }}>
        {statCards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: card.color,
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,.06)",
              textAlign: "center"
            }}
          >
            <p style={{ margin: "0 0 10px 0", color: "#666", fontSize: "14px" }}>{card.label}</p>
            <h3 style={{ 
              margin: 0,
              fontSize: "clamp(20px, 5vw, 32px)",
              color: "#2e7d32",
              fontWeight: "bold"
            }}>
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Order Status Breakdown */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,.06)"
      }}>
        <h3 style={{ marginTop: 0, fontSize: "clamp(18px, 4vw, 22px)" }}>Order Status Breakdown</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "15px"
        }}>
          {Object.entries(stats.orderStatuses).map(([status, count]) => (
            <div
              key={status}
              style={{
                background: "#f9f9f9",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center",
                border: "2px solid #e0e0e0"
              }}
            >
              <strong style={{ fontSize: "14px" }}>{status}</strong>
              <p style={{ margin: "8px 0 0 0", fontSize: "clamp(16px, 4vw, 20px)", color: "#2e7d32" }}>
                {count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
