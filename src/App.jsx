
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Home from "./pages/customer/Home.jsx";
import Products from "./pages/customer/Products.jsx";
import Shop from "./pages/customer/Shop.jsx";
import Orders from "./pages/customer/Orders.jsx";
import Track from "./pages/customer/Track.jsx";
import Login from "./pages/customer/Login.jsx";
import Contact from "./pages/customer/Contact.jsx";
import About from "./pages/customer/About.jsx";
import Help from "./pages/customer/Help.jsx";
import Cart from "./pages/customer/Cart.jsx";
import Checkout from "./pages/customer/Checkout.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminProducts from "./pages/admin/Products.jsx";
import AdminOrders from "./pages/admin/Orders.jsx";
import AdminReports from "./pages/admin/Reports.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/track" element={<Track />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Admin Login - Not Protected */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes - Protected */}
          <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
