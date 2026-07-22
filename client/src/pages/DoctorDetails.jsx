
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById } from "../api/doctorApi";
import "../styles/doctorDetails.css";

function DoctorDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDoctor = async () => {
      try {
        const res = await getDoctorById(id);
        setDoctor(res.data.doctor);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();

  }, [id]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!doctor) {
    return <h2 style={{ textAlign: "center" }}>Doctor Not Found</h2>;
  }

  const handleBooking = () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to book an appointment.");
      return;
    }

    navigate(`/book-appointment/${doctor.doctor_id}`);

  };

  return (
    <div className="doctor-details-page">

      <div className="doctor-profile">

        <div className="doctor-avatar">
          {doctor.full_name
            .split(" ")
            .slice(1)
            .map(word => word[0])
            .join("")
            .substring(0, 2)}
        </div>

        <div>

          <h1>{doctor.full_name}</h1>

          <h3>{doctor.specialization}</h3>

          <p>⭐ {doctor.rating}</p>

          <p>🏥 {doctor.hospital}</p>

          <p>📍 {doctor.city}</p>

          <p>🩺 {doctor.experience} Years Experience</p>

          <p>💰 Consultation Fee : ₹{doctor.consultation_fee}</p>

          <p>📅 {doctor.availability}</p>

        </div>

      </div>

      <div className="about-section">

        <h2>About Doctor</h2>

        <p>{doctor.about}</p>

      </div>

      <button
        className="book-btn"
        onClick={handleBooking}
      >
        Book Appointment
      </button>

    </div>
  );
}

export default DoctorDetails;