import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

export const getDoctors = (params) => {
  return API.get("/doctors", { params });
};

export const getDoctorById = (id) => {
  return API.get(`/doctors/${id}`);
};