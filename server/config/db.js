import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
ssl: {
  rejectUnauthorized: false,
},
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database Connection Failed");
    console.log(err);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

export default db;
