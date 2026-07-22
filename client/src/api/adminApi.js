import axios from "axios";

const API = "http://localhost:5000/api/appointments";

const getToken = () => localStorage.getItem("token");

export const getAllAppointments = () => {
    return axios.get(`${API}/all`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const confirmAppointment = (id) => {
    return axios.put(
        `${API}/${id}/confirm`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
};

export const cancelAppointment = (id) => {
    return axios.put(
        `${API}/${id}/cancel`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );
};