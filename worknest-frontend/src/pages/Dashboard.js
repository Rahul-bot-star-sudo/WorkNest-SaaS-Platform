import { useNavigate } from "react-router-dom";
import "./styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear(); // ✅ clean logout
    navigate("/login");   // ✅ SPA redirect
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome</h1>

        <div className="dashboard-info">
          <div>
            <span className="role-label">Email:</span>
            <span className="role-value">{email || "Unknown"}</span>
          </div>

          <div>
            <span className="role-label">Role:</span>
            <span className="role-value">{role || "Guest"}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;