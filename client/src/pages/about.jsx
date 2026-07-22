import "../styles/about.css";

import hospitalImage from "../assets/about/hospital.jpg";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}

      <section className="about-hero">

        <div className="about-content">

          <h1>About HospEase</h1>

          <p>
            Trusted healthcare made simple.
            We connect patients with experienced doctors
            through an easy online appointment platform.
            Our mission is to make quality healthcare affordable and accessible for over a billion+ Indians. We believe in empowering our users with the most accurate, comprehensive, and curated information and care, enabling them to make better healthcare decisions.
          </p>

        </div>

        <div className="about-image">

          <img
            src={hospitalImage}
            alt="Hospital"
          />

        </div>

      </section>

      {/* Story */}

      <section className="story">

        <h2>Our Story</h2>

        <p>

          HospEase was created with one simple goal —
          making healthcare accessible, convenient and
          stress-free.
          
          Instead of waiting in long hospital queues,
          patients can search doctors, compare specialists,
          and book appointments within minutes.

          Our platform combines technology with healthcare
          to provide a seamless experience for patients and
          doctors alike.

        </p>

      </section>
      {/* Mission Vision Values */}

<section className="mvv">

  <div className="mvv-card">
    <h3>🎯 Our Mission</h3>
    <p>
      To simplify healthcare by connecting patients with trusted doctors
      through an easy, secure, and reliable appointment platform.
    </p>
  </div>

  <div className="mvv-card">
    <h3>👁️ Our Vision</h3>
    <p>
      To become the most trusted digital healthcare platform that makes
      quality medical services accessible to everyone.
    </p>
  </div>

  <div className="mvv-card">
    <h3>❤️ Our Values</h3>
    <p>
      Compassion, trust, innovation, and patient-first care guide everything
      we do.
    </p>
  </div>

</section>
    {/* Why Choose Us */}

<section className="why">

  <h2>Why Choose HospEase?</h2>

  <div className="why-grid">

    <div className="why-card">
      <h3>👨‍⚕️ Expert Doctors</h3>
      <p>Consult experienced specialists across multiple departments.</p>
    </div>

    <div className="why-card">
      <h3>📅 Easy Booking</h3>
      <p>Book appointments online within minutes.</p>
    </div>

    <div className="why-card">
      <h3>🔒 Secure Records</h3>
      <p>Your medical information stays safe and protected.</p>
    </div>

    <div className="why-card">
      <h3>🚑 Emergency Support</h3>
      <p>Quick assistance whenever you need immediate care.</p>
    </div>

    <div className="why-card">
      <h3>🏥 Modern Facilities</h3>
      <p>Access advanced healthcare services with trusted professionals.</p>
    </div>

    <div className="why-card">
      <h3>⭐ Trusted Care</h3>
      <p>Thousands of satisfied patients rely on HospEase every day.</p>
    </div>

  </div>

</section>
{/* Statistics */}

<section className="stats">

  <div className="stat-box">
    <h2>150+</h2>
    <p>Doctors</p>
  </div>

  <div className="stat-box">
    <h2>20K+</h2>
    <p>Patients</p>
  </div>

  <div className="stat-box">
    <h2>35+</h2>
    <p>Departments</p>
  </div>

  <div className="stat-box">
    <h2>15+</h2>
    <p>Years of Trust</p>
  </div>

</section>

    </div>
  );
}

export default About;