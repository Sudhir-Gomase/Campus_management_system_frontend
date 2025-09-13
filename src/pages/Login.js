import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { loginRequest } from "../redux/slices/dataSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    if (!email) {
      return message.error('Login failed')
    }
    e.preventDefault();
    dispatch(loginRequest({ email, password })).unwrap().then((res) => {
      message.success('Login success')
      localStorage.setItem('accessToken', res?.token)
      localStorage.setItem('userName', res?.name)
      navigate('/')
    })
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">Welcome Back 👋</h2>
        <p className="subtitle">Login to continue</p>

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

          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">Login</button>
        </form>

        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

