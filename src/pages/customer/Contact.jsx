export default function Contact() {
  return (
    <div className="container" style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#2e7d32" }}>Contact Us</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <div>
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          <div style={{ marginTop: "20px" }}>
            <p><strong>Address:</strong> 123 Nature Lane, Green City, India</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> info@vanamitra.com</p>
          </div>
        </div>
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input type="text" placeholder="Your Name" style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} />
          <input type="email" placeholder="Your Email" style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }} />
          <textarea placeholder="Your Message" rows="5" style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}></textarea>
          <button type="submit" style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#2e7d32",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px"
          }}>Send Message</button>
        </form>
      </div>
    </div>
  );
}