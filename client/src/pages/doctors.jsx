import { useState, useEffect } from "react";
import { getDoctors } from "../api/doctorApi";
import DoctorCard from "../components/DoctorCard";
import "../styles/doctors.css";

function Doctors() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");

  const [page, setPage] = useState(1);
  const limit = 12;

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, specialty]);

  useEffect(() => {
    fetchDoctors();
  }, [page, search, specialty]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await getDoctors({
        search,
        specialization: specialty,
        page,
        limit,
      });

      if (page === 1) {
        setDoctors(response.data.doctors);
      } else {
        setDoctors((prev) => [...prev, ...response.data.doctors]);
      }

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    ...new Set(doctors.map((doctor) => doctor.specialization)),
  ];

  return (
    <section className="doctors-page">
      <h1>Meet Our Doctors</h1>

      <p>
        Find and book appointments with our experienced specialists.
      </p>

      {/* Filters */}

      <div className="doctor-filters">
        <input
          type="text"
          placeholder="🔍 Search doctor or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>

          {specialties.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {loading && page === 1 ? (
        <h2 style={{ textAlign: "center" }}>Loading doctors...</h2>
      ) : (
        <>
          <div className="doctor-grid">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.doctor_id}
                id={doctor.doctor_id}
                image="https://placehold.co/300x300?text=Doctor"
                name={doctor.full_name}
                speciality={doctor.specialization}
                experience={`${doctor.experience} Years`}
                hospital={doctor.hospital}
                rating={doctor.rating}
                available={doctor.availability !== "Weekends"}
              />
            ))}
          </div>

          <div className="see-more">
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              {page >= totalPages ? "No More Doctors" : "Load More"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Doctors;