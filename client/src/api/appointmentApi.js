import axios from "axios";

const API = "http://localhost:5000/api/appointments";

export const bookAppointment = async (appointmentData) => {

    const token = localStorage.getItem("token");

    return axios.post(
        API,
        appointmentData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
export const getMyAppointments = async () => {

    const token = localStorage.getItem("token");

    return axios.get(
        API + "/my",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};