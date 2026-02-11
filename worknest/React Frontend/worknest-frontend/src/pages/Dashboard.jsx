import { getUser } from "../utils/auth";
import Profile from "../Components/Profile";
import "./styles/dashboard.css";

function Dashboard() {
  const user = getUser();

  if (!user) {
    return <p>No user found</p>;
  }

  const roleCode = user.role.role_code;
  const priority = user.role.priority;

  return (
    <div className="dashboard-container">
      
      {/* LEFT SIDE PROFILE */}
      <Profile
        name={user.name}
        roleCode={roleCode}
        priority={priority}
      />

      {/* RIGHT SIDE MAIN */}
      <div className="dashboard-main">
        <h1 className="dashboard-title">
          Welcome {user.name}
        </h1>

        <p className="dashboard-role">
          Role: {roleCode} (Priority: {priority})
        </p>

        {priority >= 100 && (
          <div className="dashboard-panel">
            <h2>Super Admin Panel</h2>
            <p>System level controls</p>
          </div>
        )}

        {priority >= 90 && priority < 100 && (
          <div className="dashboard-panel">
            <h2>Admin Panel</h2>
            <p>User management</p>
          </div>
        )}

        {priority < 90 && (
          <div className="dashboard-panel">
            <h2>User Dashboard</h2>
            <p>Your activity summary</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
