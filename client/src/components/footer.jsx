import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-section">
          <h2>🏥 HospEase</h2>

          <p>
            Your trusted healthcare partner. Easily find experienced doctors
            and book appointments anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p><FaPhoneAlt /> +91 9876543210</p>

          <p><FaEnvelope /> support@hospease.com</p>

          <p><FaMapMarkerAlt /> Delhi, India</p>
        </div>

        {/* Socials */}
        <div className="footer-section">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#"><FaFacebook /></a>

            <a href="#"><FaInstagram /></a>

            <a href="#"><FaTwitter /></a>

            <a href="#"><FaLinkedin /></a>

          </div>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        © 2026 HospEase. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;