import DepartmentCard from "../components/deptc";
import departments from "../data/departments";
import "../styles/Departments.css";

function Departments() {
  return (
    <section className="departments">

      <h2>Our Departments</h2>

      <p>
        Choose from a wide range of medical specialists.
      </p>

      <div className="department-grid">

        {departments.map((department) => (
          <DepartmentCard
            key={department.id}
            icon={department.icon}
            title={department.title}
            description={department.description}
          />
        ))}

      </div>

    </section>
  );
}

export default Departments;