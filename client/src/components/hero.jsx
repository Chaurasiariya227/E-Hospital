import StatCard from "./StatCard";
import doctorImage from "../assets/doc1.png";
import "../styles/hero.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";
function Hero() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
  return (
    
    <section className="hero">

    <div className="hero-content">

        <span className="hero-badge">
            ⭐ Trusted by 20,000+ Patients
        </span>

        <h1>Book Your Appointment Online</h1>

        <p>
            Get expert healthcare from experienced doctors.
        </p>

        <div className="hero-buttons">
        <button
  className="primary-btn"
  onClick={() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/doctors");
    } else {
      setIsLogin(true);
      setIsOpen(true);
    }
  }}
>
  Book Appointment
</button>

        <button className="secondary-btn"
           onClick={()=>navigate("/doctors")}
        >
           Find Doctors
        </button>
        </div>

        <div className="stats-container">

            <StatCard
                icon="👨‍⚕️"
                number="150+"
                title="Doctors"
            />

            <StatCard
                icon="❤️"
                number="20K+"
                title="Patients"
            />

            <StatCard
                icon="🏥"
                number="35+"
                title="Departments"
            />

        </div>

    </div>

    <div className="hero-image">

        <img
            src={doctorImage}
            alt="Doctor"
        />

    </div>
    <AuthModal isOpen={isOpen}
       onClose={() => setIsOpen(false)} isLogin={isLogin}
       toggleMode={() => setIsLogin(!isLogin)}
    />
</section>
  );
}

export default Hero;