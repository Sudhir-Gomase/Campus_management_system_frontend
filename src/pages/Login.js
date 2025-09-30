import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Input, message, Modal } from "antd";
import { useDispatch } from "react-redux";
import { companyRegistration, loginRequest } from "../redux/slices/dataSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    contact_email: "",
    contact_phone: "",
    offer_type: "",
    description: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    if (!email) {
      return message.error('Login failed')
    }
    e.preventDefault();
    const requestedData = {
      email, password, type: selectedType
    }
    if (selectedType === 'company') {
      requestedData['username'] = email
      delete requestedData['email']
    }
    dispatch(loginRequest(requestedData)).unwrap().then((res) => {
      message.success('Login success')
      localStorage.setItem('accessToken', res?.token)
      localStorage.setItem('userName', res?.name)
      localStorage.setItem('userdetails', JSON.stringify(res))
      localStorage.setItem('loginType', res?.role)
      if (res?.role === 'student') {
        navigate('/student-dashboard')
      } else if (res?.role === 'company') {
        navigate('/company-dashbaord')
      } else if (res?.role === 'admin') {
        navigate('/')
      }
    }).catch((error) => {
      message.error(error?.message ?? 'Failed to Login')
    })
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async () => {
    // Replace with your registration API call
    try {
      await dispatch(companyRegistration(registerData)).unwrap().then((res) => {
        message.success('Admin will get back to you soon after verification.');
        setShowRegister(false);
        setRegisterData({
          name: "",
          contact_email: "",
          contact_phone: "",
          offer_type: "",
          description: "",
        });
      });
      // await dispatch(registerCompany(registerData)).unwrap();
    } catch (err) {
      message.error(err?.message || "Registration failed");
    }
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
                type="name"
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
        {selectedType === "company" && (
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <span
              style={{ color: "#4b95a2", cursor: "pointer", fontWeight: 500 }}
              onClick={() => setShowRegister(true)}
            >
              Register your company
            </span>
          </div>
        )}
        <Modal
          open={showRegister}
          onCancel={() => setShowRegister(false)}
          title="Register Company"
          footer={null}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input
              name="name"
              placeholder="Company Name"
              value={registerData.name}
              onChange={handleRegisterChange}
            />
            <Input
              name="contact_email"
              placeholder="Contact Email"
              value={registerData.contact_email}
              onChange={handleRegisterChange}
            />
            <Input
              name="contact_phone"
              placeholder="Contact Phone"
              value={registerData.contact_phone}
              onChange={handleRegisterChange}
            />
            <Input
              name="offer_type"
              placeholder="Offer Type"
              value={registerData.offer_type}
              onChange={handleRegisterChange}
            />
            <Input.TextArea
              name="description"
              placeholder="Description"
              value={registerData.description}
              onChange={handleRegisterChange}
              rows={3}
            />
            <button
              className="btn"
              style={{ marginTop: 8 }}
              onClick={handleRegisterSubmit}
              type="button"
            >
              Register
            </button>
          </div>
        </Modal>

        {/* <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p> */}
      </div>
    </div>
  );
}

export default Login;