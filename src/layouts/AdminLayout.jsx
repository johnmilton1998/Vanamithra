
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout(){
  return (
    <div style={{display:"flex"}}>
      <div style={{width:220,background:"#1b5e20",color:"#fff",minHeight:"100vh",padding:20}}>
        <h3>Admin Panel</h3>
        <div style={{display:"grid",gap:10}}>
          <Link to="/admin" style={{color:"#fff",textDecoration:"none"}}>Dashboard</Link>
          <Link to="/admin/products" style={{color:"#fff",textDecoration:"none"}}>Products</Link>
          <Link to="/admin/orders" style={{color:"#fff",textDecoration:"none"}}>Orders</Link>
          <Link to="/admin/reports" style={{color:"#fff",textDecoration:"none"}}>Reports</Link>
        </div>
      </div>
      <div style={{flex:1, padding: "20px"}}><Outlet/></div>
    </div>
  )
}
