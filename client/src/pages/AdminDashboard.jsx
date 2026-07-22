import { useEffect, useState } from "react";
import {
    getAllAppointments,
    confirmAppointment,
    cancelAppointment
} from "../api/adminApi";
import "./AdminDashboard.css";

const AdminDashboard = () => {

    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const fetchAppointments = async () => {

        try {

            const res = await getAllAppointments();
            setAppointments(res.data.appointments);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchAppointments();

    }, []);

    const handleConfirm = async (id) => {

        try {

            await confirmAppointment(id);
            fetchAppointments();

        } catch (err) {

            console.log(err);

        }

    };

    const handleCancel = async (id) => {

        try {

            await cancelAppointment(id);
            fetchAppointments();

        } catch (err) {

            console.log(err);

        }

    };

    const filteredAppointments = appointments.filter((a) =>

    a.patient_name.toLowerCase().includes(search.toLowerCase()) ||

    a.doctor_name.toLowerCase().includes(search.toLowerCase())

);

const total = filteredAppointments.length;
    const pending = filteredAppointments.filter(a => a.status === "Pending").length;

const confirmed = filteredAppointments.filter(a => a.status === "Confirmed").length;

const cancelled = filteredAppointments.filter(a => a.status === "Cancelled").length;

    return (

        <div className="admin-page">

            <h1>Admin Dashboard</h1>

            <div className="stats">

                <div className="card">
                    <h2>{total}</h2>
                    <p>Total Appointments</p>
                </div>

                <div className="card">
                    <h2>{pending}</h2>
                    <p>Pending</p>
                </div>

                <div className="card">
                    <h2>{confirmed}</h2>
                    <p>Confirmed</p>
                </div>

                <div className="card">
                    <h2>{cancelled}</h2>
                    <p>Cancelled</p>
                </div>

            </div>
            <input
    type="text"
    placeholder="Search by patient or doctor..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-bar"
/>
            <table>

                <thead>

                    <tr>

                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Specialization</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredAppointments.map((a) => (

                        <tr key={a.appointment_id}>

                            <td>{a.patient_name}</td>
                            <td>{a.doctor_name}</td>
                            <td>{a.specialization}</td>
                            <td>{a.appointment_date}</td>
                            <td>{a.appointment_time}</td>
                            <td>{a.status}</td>

                            <td>

                                {a.status === "Pending" && (

                                    <>
                                        <button
                                            onClick={() =>
                                                handleConfirm(a.appointment_id)
                                            }
                                        >
                                            Confirm
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleCancel(a.appointment_id)
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default AdminDashboard;