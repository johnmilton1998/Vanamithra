import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import toast from "react-hot-toast";

toast.success("🎉 Account created successfully!");
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
  if (isLogin) {
    login(form.email, form.password);
    setSuccess("✅ Login successful. Redirecting...");
  } else {
    register(form.name, form.email, form.password, form.phone);
    setSuccess("🎉 Account created successfully! Welcome to Vanamitra.");
  }

  setTimeout(() => navigate("/"), 1500);
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

        {!isLogin && (
          <input name="name" placeholder="Full Name" onChange={handleChange}/>
        )}

        <input name="email" placeholder="Email" onChange={handleChange}/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange}/>

        {!isLogin && (
          <input name="phone" placeholder="Mobile Number" onChange={handleChange}/>
        )}
{success && <div className="success-msg">{success}</div>}
        <button className="auth-btn" onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <div className="auth-toggle">
          {isLogin ? "New here?" : "Already have account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Create Account" : " Login"}
            
          </span>
          
        </div>
      </div>
    </div>
  );
}