import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config();

// =====================
// Indian Names
// =====================

const firstNames = [
  "Aarav","Vivaan","Aditya","Arjun","Rahul","Rohan","Karan","Akash",
  "Ananya","Aditi","Priya","Sneha","Pooja","Neha","Ishita","Kavya",
  "Siddharth","Nikhil","Abhishek","Ayush","Harsh","Manav","Ritika",
  "Shreya","Diya","Meera","Tanvi","Riya","Nandini","Sakshi",
  "Vikram","Rajat","Yash","Aryan","Krishna","Mohit","Shivam",
  "Ankit","Deepak","Saurabh","Anjali","Simran","Muskaan","Khushi",
  "Payal","Bhavna","Shruti","Komal","Swati","Pallavi"
];

const lastNames = [
  "Sharma","Verma","Singh","Gupta","Patel","Mehta","Agarwal",
  "Jain","Kapoor","Khanna","Chopra","Malhotra","Saxena",
  "Yadav","Mishra","Pandey","Srivastava","Bansal",
  "Chaudhary","Joshi","Kulkarni","Nair","Menon",
  "Reddy","Iyer","Pillai","Das","Roy","Ghosh",
  "Banerjee","Sinha","Kumar","Tripathi","Dubey",
  "Thakur","Bhardwaj","Tiwari","Mahajan","Arora",
  "Bose","Shukla","Nagpal","Bhatia","Sethi"
];

// =====================
// Specializations
// =====================

const specializations = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Dermatology",
  "Pediatrics",
  "ENT",
  "Gynecology",
  "Psychiatry",
  "Oncology",
  "Radiology",
  "Dentistry",
  "Ophthalmology",
  "Urology",
  "Endocrinology",
  "Nephrology",
  "Pulmonology",
  "Gastroenterology",
  "General Medicine",
  "Plastic Surgery",
  "Physiotherapy"
];

// =====================
// Hospitals
// =====================

const hospitals = [
  "Apollo Hospital",
  "Fortis Hospital",
  "Max Healthcare",
  "AIIMS",
  "Medanta",
  "Manipal Hospital",
  "BLK-Max Hospital",
  "Narayana Health",
  "Cloudnine Hospital",
  "Sir Ganga Ram Hospital",
  "Artemis Hospital",
  "Kokilaben Hospital",
  "Lilavati Hospital",
  "Yashoda Hospital",
  "Care Hospitals"
];

// =====================
// Cities
// =====================

const cities = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Lucknow",
  "Jaipur",
  "Ahmedabad",
  "Kolkata"
];

// =====================
// Availability
// =====================

const availability = [
  "Mon-Fri",
  "Mon-Sat",
  "Tue-Sat",
  "Weekdays",
  "Weekends"
];

// =====================
// About Templates
// =====================

const aboutTemplates = [
  "Experienced specialist dedicated to patient-centered care.",
  "Committed to providing compassionate and evidence-based treatment.",
  "Specializes in accurate diagnosis and personalized healthcare plans.",
  "Known for excellence in clinical practice and patient satisfaction.",
  "Passionate about improving patient health through modern medical care.",
  "Provides comprehensive treatment with a focus on long-term wellness.",
  "Experienced in handling complex medical conditions with precision.",
  "Focused on delivering quality healthcare using the latest medical practices."
];

// =====================
// Generate Doctors
// =====================

const doctorValues = [];

for (let i = 0; i < 500; i++) {

  const firstName =
    firstNames[
      faker.number.int({
        min: 0,
        max: firstNames.length - 1
      })
    ];

  const lastName =
    lastNames[
      faker.number.int({
        min: 0,
        max: lastNames.length - 1
      })
    ];

  const fullName = `Dr. ${firstName} ${lastName}`;

  const specialization =
    specializations[
      faker.number.int({
        min: 0,
        max: specializations.length - 1
      })
    ];

  const hospital =
    hospitals[
      faker.number.int({
        min: 0,
        max: hospitals.length - 1
      })
    ];

  const city =
    cities[
      faker.number.int({
        min: 0,
        max: cities.length - 1
      })
    ];

  const experience = faker.number.int({
    min: 2,
    max: 35
  });

  const consultationFee = faker.number.int({
    min: 400,
    max: 2000
  });

  const rating = faker.number.float({
    min: 4.0,
    max: 5.0,
    fractionDigits: 1
  });

  const available =
    availability[
      faker.number.int({
        min: 0,
        max: availability.length - 1
      })
    ];

  const about =
    aboutTemplates[
      faker.number.int({
        min: 0,
        max: aboutTemplates.length - 1
      })
    ];

  doctorValues.push([
    fullName,
    specialization,
    hospital,
    city,
    experience,
    consultationFee,
    rating,
    available,
    about
  ]);
}

// =====================
// Insert into MySQL
// =====================

const sql = `
INSERT INTO doctors
(full_name, specialization, hospital, city, experience, consultation_fee, rating, availability, about)
VALUES ?
`;

db.query(sql, [doctorValues], (err, result) => {
  if (err) {
    console.error("❌ Error:", err);
  } else {
    console.log(`✅ ${result.affectedRows} doctors inserted successfully!`);
  }

  db.end();
});