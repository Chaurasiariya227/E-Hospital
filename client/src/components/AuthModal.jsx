import { useState } from "react";
import { signup, login } from "../api/authApi";
import "../styles/authModal.css";

function AuthModal({ isOpen, onClose, isLogin, toggleMode }) {

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!isLogin) {

        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        await signup({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });

        alert("Signup Successful!");

        toggleMode();

      } else {

        const response = await login({
          email: formData.email,
          password: formData.password
        });
        console.log("LOGIN RESPONSE:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        alert(`Welcome ${response.data.user.name}!`);

        onClose();
      }

    } catch (err) {

      alert(
        err.response?.data?.message || "Something went wrong"
      );

    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        <p className="subtitle">
          {isLogin
            ? "Welcome back! Please login to continue."
            : "Join HospEase and book appointments easily."}
        </p>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <>
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>

        </form>

        <p className="switch-text">
          {isLogin
            ? "Don't have an account? "
            : "Already have an account? "}

          <span onClick={toggleMode}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

      </div>

    </div>
  );
}

export default AuthModal;