export default function Help() {
  return (
    <div className="container" style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#2e7d32" }}>Help & Support</h1>
      <div style={{ display: "grid", gap: "30px" }}>
        <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
          <h3>Frequently Asked Questions</h3>
          <div style={{ marginTop: "15px" }}>
            <h4>How do I place an order?</h4>
            <p>Add products to your cart and proceed to checkout. You can pay 10% advance for COD or use UPI.</p>
          </div>
          <div style={{ marginTop: "15px" }}>
            <h4>How do I track my order?</h4>
            <p>Use the "Track Order" section with your order ID to check the status.</p>
          </div>
          <div style={{ marginTop: "15px" }}>
            <h4>What payment methods do you accept?</h4>
            <p>We accept UPI payments and Cash on Delivery (with 10% advance).</p>
          </div>
        </div>
        <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
          <h3>Contact Support</h3>
          <p>If you need further assistance, please contact us:</p>
          <p><strong>Email:</strong> karthikpriyanm4@gmail.com</p>
          <p><strong>Phone:</strong> +91 8870859460</p>
          <p><strong>WhatsApp:</strong> +91 8870859460</p>
        </div>
      </div>
    </div>
  );
}