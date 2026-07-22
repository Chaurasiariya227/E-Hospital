import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import doctorRoutes from "./routes/doctorRoutes.js";
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🏥 HospEase Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.use("/api/doctors", doctorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});