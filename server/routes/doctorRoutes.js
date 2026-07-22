import express from "express";
import {
  getAllDoctors,
  getDoctorById,
} from "../controllers/doctorController.js";
const router = express.Router();
router.get("/:id", getDoctorById);
router.get("/", getAllDoctors);

export default router;