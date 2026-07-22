import "../styles/DepartmentCard.css";
function DepartmentCard({ icon: Icon, title, description }) {
  return (
    <div className="department-card">
      <div className="department-icon">
        <Icon />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <button>View Doctors →</button>
    </div>
  );
}

export default DepartmentCard;