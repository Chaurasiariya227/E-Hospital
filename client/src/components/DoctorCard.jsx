import { useNavigate } from "react-router-dom";
import "../styles/doctorCard.css";

function DoctorCard({
  id,
  image,
  name,
  speciality,
  experience,
  hospital,
  rating,
  available,
}) {

  const navigate = useNavigate();

  return (
    <div className="doctor-card">

      <div className="doctor-avatar">
        {name
          .split(" ")
          .slice(1)
          .map((word) => word[0])
          .join("")
          .substring(0, 2)}
      </div>

      <div className="doctor-info">

        <h3>{name}</h3>

        <p className="speciality">{speciality}</p>

        <div className="doctor-details">
          <p>⭐ {rating}</p>
          <p>🏥 {hospital}</p>
          <p>🕒 {experience} Experience</p>
        </div>

        {available ? (
          <span className="available">🟢 Available Today</span>
        ) : (
          <span className="unavailable">🔴 Fully Booked</span>
        )}

        <button
          onClick={() => navigate(`/doctor/${id}`)}
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default DoctorCard;