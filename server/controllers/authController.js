import db from "../config/db.js";
import jwt from "jsonwebtoken";

// ================= SIGNUP =================

export const signup = (req, res) => {

  const { full_name, email, phone, password } = req.body;

  if (!full_name || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields"
    });
  }

  const checkUser =
    "SELECT * FROM users WHERE email = ? OR phone = ?";

  db.query(checkUser, [email, phone], (err, result) => {

    if (err)
      return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email or Phone already exists"
      });
    }

    const sql = `
      INSERT INTO users
      (full_name,email,phone,password)
      VALUES(?,?,?,?)
    `;

    db.query(
      sql,
      [full_name, email, phone, password],
      (err, result) => {

        if (err)
          return res.status(500).json(err);

        res.status(201).json({
          success: true,
          message: "User Registered Successfully"
        });

      }
    );

  });

};

// ================= LOGIN =================

export const login = (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], (err, result) => {

    if (err)
      return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const user = result[0];

    if (user.password !== password) {

      return res.status(401).json({
        success: false,
        message: "Invalid Password"
      });

    }

    const token = jwt.sign(

      {
        id: user.user_id,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.json({

      success: true,

      token,

      user: {

    id: user.user_id,
    name: user.full_name,
    email: user.email,
    phone: user.phone,
    role: user.role

}

    });

  });

};