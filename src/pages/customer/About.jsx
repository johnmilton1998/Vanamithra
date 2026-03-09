export default function About() {
  return (
    <div className="container" style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#2e7d32" }}>About Vanamitra</h1>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img src="/about-hero.jpg" alt="About Vanamitra" style={{ width: "100%", maxWidth: "600px", borderRadius: "12px" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
        <div>
          <h2>Our Story</h2>
          <p>Vanamitra was born from a passion for natural wellness and sustainable living. We believe in harnessing the power of nature to provide pure, organic oils that nourish your body and soul.</p>
          <p>Founded in 2020, we've been committed to sourcing the finest ingredients and delivering them to your doorstep with care and integrity.</p>
        </div>
        <div>
          <h2>Our Mission</h2>
          <p>To promote healthy living through premium natural oils, supporting local farmers and sustainable practices while providing exceptional products to our customers.</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>✅ 100% Organic Ingredients</li>
            <li>✅ Sustainable Sourcing</li>
            <li>✅ Quality Assurance</li>
            <li>✅ Customer Satisfaction</li>
          </ul>
        </div>
      </div>
    </div>
  );
}