
export default function Dashboard(){
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div className="grid" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
        <div className="card">Total Orders: 120</div>
        <div className="card">Revenue: ₹45,000</div>
        <div className="card">Monthly Sales: ₹12,000</div>
      </div>
    </div>
  )
}
