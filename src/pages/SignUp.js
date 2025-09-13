import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">Create Account ✨</h2>
        <p className="subtitle">Sign up to get started</p>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">Sign Up</button>
        </form>

        <p className="signup-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
