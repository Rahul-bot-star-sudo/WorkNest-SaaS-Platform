import "./styles/Dashboard.css";

function Dashboard() {
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome</h1>
        
        <div className="dashboard-role">
          <span className="role-label">Role:</span>
          <span className="role-value">{role || "Guest"}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;