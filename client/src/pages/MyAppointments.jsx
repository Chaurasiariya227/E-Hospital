import { useEffect, useState } from "react";
import { getMyAppointments } from "../api/appointmentApi";
import jsPDF from "jspdf";
import "../styles/myAppointments.css";

function MyAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await getMyAppointments();
            setAppointments(res.data.appointments);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const downloadSlip = (appointment) => {

        const user = JSON.parse(localStorage.getItem("user"));

        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("HospEase", 80, 20);

        doc.setFontSize(16);
        doc.text("Appointment Slip", 70, 35);

        doc.setFontSize(12);

        let y = 55;

        doc.text(`Appointment ID : ${appointment.appointment_id}`, 20, y);
        y += 10;

        doc.text(`Patient Name : ${user.name}`, 20, y);
        y += 10;

        doc.text(`Doctor : ${appointment.full_name}`, 20, y);
        y += 10;

        doc.text(`Specialization : ${appointment.specialization}`, 20, y);
        y += 10;

        doc.text(`Hospital : ${appointment.hospital}`, 20, y);
        y += 10;

        doc.text(`Date : ${appointment.appointment_date.split("T")[0]}`, 20, y);
        y += 10;

        doc.text(`Time : ${appointment.appointment_time}`, 20, y);
        y += 10;

        doc.text(`Reason : ${appointment.reason}`, 20, y);
        y += 10;

        doc.text(`Status : ${appointment.status}`, 20, y);
        y += 20;

        doc.text("Thank you for choosing HospEase.", 20, y);

        doc.save(`Appointment_${appointment.appointment_id}.pdf`);
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="appointments-container">

            <h1>My Appointments</h1>

            {appointments.length === 0 ? (
                <h3>No Appointments Yet</h3>
            ) : (
                appointments.map((appointment) => (

                    <div
                        className="appointment-card"
                        key={appointment.appointment_id}
                    >

                        <h2>{appointment.full_name}</h2>

                        <p><strong>Specialization:</strong> {appointment.specialization}</p>

                        <p><strong>Hospital:</strong> {appointment.hospital}</p>

                        <p><strong>Date:</strong> {appointment.appointment_date?.split("T")[0]}</p>

                        <p><strong>Time:</strong> {appointment.appointment_time}</p>

                        <p><strong>Reason:</strong> {appointment.reason}</p>

                        <p>
                            <strong>Status:</strong>{" "}
                            <span className={appointment.status.toLowerCase()}>
                                {appointment.status}
                            </span>
                        </p>

                        {appointment.status === "Confirmed" && (
                            <button
                                onClick={() => downloadSlip(appointment)}
                                className="download-btn"
                            >
                                Download Appointment Slip
                            </button>
                        )}

                    </div>

                ))
            )}

        </div>
    );
}

export default MyAppointments;