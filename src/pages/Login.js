import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { loginRequest } from "../redux/slices/dataSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    if (!email) {
      return message.error('Login failed')
    }
    e.preventDefault();
    dispatch(loginRequest({ email, password, type: selectedType })).unwrap().then((res) => {
      message.success('Login success')
      localStorage.setItem('accessToken', res?.token)
      localStorage.setItem('userName', res?.name)
      localStorage.setItem('userdetails', JSON.stringify(res))
      localStorage.setItem('loginType', res?.role)
      if (res?.role === 'student') {
        navigate('/student-dashboard')
      } else {
        navigate('/')
      }
    }).catch((error) => {
      message.error(error?.message ?? 'Failed to Login')
    })
  };

  const cardData = [
    { type: "company", label: "Company", icon: "🏢" },
    { type: "admin", label: "Admin", icon: "🛡️" },
    { type: "student", label: "Student", icon: "🎓" },
  ];

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">Welcome Back 👋</h2>
        <p className="subtitle">Login to continue</p>

        {/* Card Selection */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, justifyContent: "center" }}>
          {cardData.map(card => (
            <div
              className="flex"
              key={card.type}
              onClick={() => setSelectedType(card.type)}
              style={{
                flexDirection: 'column',
                border: selectedType === card.type ? "2px solid #4b95a2" : "1px solid #ddd",
                borderRadius: 8,
                padding: "18px 28px",
                cursor: "pointer",
                background: selectedType === card.type ? "#e6f7fa" : "#fff",
                boxShadow: selectedType === card.type ? "0 2px 8px #4b95a233" : "none",
                textAlign: "center",
                // minWidth: 100,
                transition: "all 0.2s"
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 500 }}>{card.label}</div>
            </div>
          ))}
        </div>

        {/* Show login form only if a card is selected */}
        {selectedType && (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group" style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: 40 }}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: 18,
                  color: "#4b95a2"
                }}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" className="btn">Login</button>
          </form>
        )}

        {/* <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p> */}
      </div>
    </div>
  );
}

export default Login;