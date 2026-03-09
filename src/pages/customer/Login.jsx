import { useState } from "react";
import "./auth.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p>{isLogin ? "Login to continue shopping" : "Join Vanamitra family"}</p>

        {!isLogin && (
          <input type="text" placeholder="Full Name" />
        )}

        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />

        {!isLogin && (
          <input type="tel" placeholder="Mobile Number" />
        )}

        <button className="auth-btn">
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