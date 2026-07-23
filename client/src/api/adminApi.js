import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/appointments`;

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