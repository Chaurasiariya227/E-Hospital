import { useEffect, useState } from "react";
import { useParams,useNavigate} from "react-router-dom";
import { getDoctorById } from "../api/doctorApi";
import { bookAppointment } from "../api/appointmentApi";
import "../styles/bookAppointment.css";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    appointment_date: "",
    appointment_time: "",
    reason: ""
  });

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const res = await getDoctorById(id);
      setDoctor(res.data.doctor);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        await bookAppointment({

            doctor_id: doctor.doctor_id,
            appointment_date: formData.appointment_date,
            appointment_time: formData.appointment_time,
            reason: formData.reason

        });

        alert("Appointment Booked Successfully!");

        navigate("/my-appointments");

    } catch (err) {

        console.log(err);

        alert(
            err.response?.data?.message ||
            "Booking Failed"
        );

    }

};
  if (!doctor) return <h2>Loading...</h2>;

  return (
    <div className="booking-container">

      <h1>Book Appointment</h1>

      <div className="doctor-card-book">

        <h2>{doctor.full_name}</h2>

        <p>{doctor.specialization}</p>

        <p>{doctor.hospital}</p>

        <p>₹ {doctor.consultation_fee}</p>

      </div>

      <form className="booking-form" onSubmit={handleSubmit}>

        <input
          value={user?.name}
          disabled
        />

        <input
          value={user?.email}
          disabled
        />

        <input
          value={user?.phone}
          disabled
        />

        <label>Select Date</label>

        <input
          type="date"
          name="appointment_date"
          value={formData.appointment_date}
          onChange={handleChange}
          required
        />

        <label>Select Time</label>

        <select
          name="appointment_time"
          value={formData.appointment_time}
          onChange={handleChange}
          required
        >
          <option value="">Choose Time</option>
          <option>09:00 AM</option>
          <option>10:00 AM</option>
          <option>11:00 AM</option>
          <option>12:00 PM</option>
          <option>02:00 PM</option>
          <option>03:00 PM</option>
          <option>04:00 PM</option>
        </select>

        <textarea
          placeholder="Reason for visit"
          name="reason"
          rows="5"
          value={formData.reason}
          onChange={handleChange}
        />

        <button type="submit">
          Confirm Appointment
        </button>

      </form>

    </div>
  );
}

export default BookAppointment;