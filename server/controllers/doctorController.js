import db from "../config/db.js";

export const getAllDoctors = (req, res) => {
  const {
    search,
    city,
    specialization,
    hospital,
    page = 1,
    limit = 12,
  } = req.query;

  let sql = "SELECT * FROM doctors WHERE 1=1";
  let countSql = "SELECT COUNT(*) AS total FROM doctors WHERE 1=1";

  const values = [];
  const countValues = [];

  if (search) {
    sql += " AND full_name LIKE ?";
    countSql += " AND full_name LIKE ?";
    values.push(`%${search}%`);
    countValues.push(`%${search}%`);
  }

  if (city) {
    sql += " AND city = ?";
    countSql += " AND city = ?";
    values.push(city);
    countValues.push(city);
  }

  if (specialization) {
    sql += " AND specialization = ?";
    countSql += " AND specialization = ?";
    values.push(specialization);
    countValues.push(specialization);
  }

  if (hospital) {
    sql += " AND hospital = ?";
    countSql += " AND hospital = ?";
    values.push(hospital);
    countValues.push(hospital);
  }

  sql += " ORDER BY rating DESC";

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const offset = (pageNumber - 1) * limitNumber;

  sql += " LIMIT ? OFFSET ?";
  values.push(limitNumber, offset);

  db.query(countSql, countValues, (countErr, countResult) => {
    if (countErr) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    const totalDoctors = countResult[0].total;

    db.query(sql, values, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.status(200).json({
        success: true,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalDoctors / limitNumber),
        totalDoctors,
        count: results.length,
        doctors: results,
      });
    });
  });
};
export const getDoctorById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM doctors WHERE doctor_id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor: results[0],
    });
  });
};