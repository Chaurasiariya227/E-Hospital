import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import AuthModal from "../components/AuthModal";
import "../styles/navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
 
  const [user, setUser] = useState(null);
  const isAdmin = user?.role === "admin";
  useEffect(() => {

    const loadUser = () => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }

    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
        window.removeEventListener("storage", loadUser);
    };

}, []);

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    alert("Logged Out Successfully");

  };

  return (
    <>
      <nav className="navbar">

        <div className="logo">
          <Link to="/">🏥 HospEase</Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
          {token && (<li><Link to="/my-appointments">My Appointments</Link></li>)}
          {isAdmin && (<li><Link to="/admin">Admin</Link></li>)}
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {user ? (

          <div className="user-section">

            <span className="username">
              👤 {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </div>

        ) : (

          <div className="auth-buttons">

            <button
              className="login-btn"
              onClick={() => {
                setIsLogin(true);
                setIsOpen(true);
              }}
            >
              Login
            </button>

            <button
              className="signup-btn"
              onClick={() => {
                setIsLogin(false);
                setIsOpen(true);
              }}
            >
              Sign Up
            </button>

          </div>

        )}

      </nav>

      <AuthModal
        isOpen={isOpen}
        isLogin={isLogin}
        onClose={() => {

          setIsOpen(false);

          const storedUser = localStorage.getItem("user");

          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }

        }}
        toggleMode={() => setIsLogin(!isLogin)}
      />
    </>
  );
}

export default Navbar;