import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getDoctors = (params) => {
  return API.get("/doctors", { params });
};

export const getDoctorById = (id) => {
  return API.get(`/doctors/${id}`);
};