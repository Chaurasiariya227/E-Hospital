import express from "express";
import db from "../config/db.js";
import verifyToken from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ==========================================
   BOOK APPOINTMENT
========================================== */

router.post("/", verifyToken, (req, res) => {

    const {
        doctor_id,
        appointment_date,
        appointment_time,
        reason
    } = req.body;

    const user_id = req.user.id;

    if (
        !doctor_id ||
        !appointment_date ||
        !appointment_time ||
        !reason
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    const sql = `
        INSERT INTO appointments
        (user_id, doctor_id, appointment_date, appointment_time, reason)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            doctor_id,
            appointment_date,
            appointment_time,
            reason
        ],
        (err) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }

            res.status(201).json({
                success: true,
                message: "Appointment Booked Successfully"
            });

        }
    );

});

/* ==========================================
   USER APPOINTMENTS
========================================== */

router.get("/my", verifyToken, (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT
            a.*,
            d.full_name,
            d.specialization,
            d.hospital
        FROM appointments a
        JOIN doctors d
            ON a.doctor_id = d.doctor_id
        WHERE a.user_id = ?
        ORDER BY appointment_date ASC
    `;

    db.query(sql, [user_id], (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        res.json({
            success: true,
            appointments: result
        });

    });

});

/* ==========================================
   ADMIN - ALL APPOINTMENTS
========================================== */

router.get("/all", verifyToken, verifyAdmin, (req, res) => {

    const sql = `
        SELECT
            a.*,
            u.full_name AS patient_name,
            d.full_name AS doctor_name,
            d.specialization,
            d.hospital
        FROM appointments a
        JOIN users u
            ON a.user_id = u.user_id
        JOIN doctors d
            ON a.doctor_id = d.doctor_id
        ORDER BY a.created_at DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        res.json({
            success: true,
            appointments: result
        });

    });

});

/* ==========================================
   ADMIN - CONFIRM APPOINTMENT
========================================== */

router.put("/:id/confirm", verifyToken, verifyAdmin, (req, res) => {

    const sql =
        "UPDATE appointments SET status='Confirmed' WHERE appointment_id=?";

    db.query(sql, [req.params.id], (err) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        res.json({
            success: true,
            message: "Appointment Confirmed"
        });

    });

});

/* ==========================================
   ADMIN - CANCEL APPOINTMENT
========================================== */

router.put("/:id/cancel", verifyToken, verifyAdmin, (req, res) => {

    const sql =
        "UPDATE appointments SET status='Cancelled' WHERE appointment_id=?";

    db.query(sql, [req.params.id], (err) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        res.json({
            success: true,
            message: "Appointment Cancelled"
        });

    });

});

export default router;