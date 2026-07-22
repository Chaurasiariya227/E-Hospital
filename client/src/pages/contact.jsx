import "../styles/contact.css";

function Contact() {
  return (
    <div className="contact-page">

      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Reach out to us for appointments,
          inquiries, or emergency assistance.
        </p>
      </section>

      <section className="contact-container">

        {/* Left Side */}
        <div className="contact-info">

          <div className="info-card">
            <h3>📍 Address</h3>
            <p>HospEase Healthcare Center</p>
            <p>New Delhi, India</p>
          </div>

          <div className="info-card">
            <h3>📞 Phone</h3>
            <p>+91 9876543210</p>
          </div>

          <div className="info-card">
            <h3>✉ Email</h3>
            <p>support@hospease.com</p>
          </div>

          <div className="info-card">
            <h3>🕒 Working Hours</h3>
            <p>Mon - Fri : 9 AM - 8 PM</p>
            <p>Saturday : 9 AM - 5 PM</p>
            <p>Sunday : Emergency Only</p>
          </div>

        </div>

        {/* Right Side */}

        <div className="contact-form">

          <h2>Send a Message</h2>

          <form>

            <input type="text" placeholder="Full Name" required />

            <input type="email" placeholder="Email Address" required />

            <input type="text" placeholder="Subject" required />

            <textarea
              rows="6"
              placeholder="Write your message..."
            ></textarea>

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </section>

      {/* Google Map */}

      <section className="map">

        <iframe
          title="Hospital Location"
          src="https://www.google.com/maps?q=New+Delhi&output=embed"
          allowFullScreen
          loading="lazy"
        ></iframe>

      </section>

    </div>
  );
}

export default Contact;