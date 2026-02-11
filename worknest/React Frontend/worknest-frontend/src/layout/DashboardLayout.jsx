import { Outlet, Link } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      
      {/* Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 20px",
          background: "#222",
          color: "#fff"
        }}
      >
        <div>
          <strong>WorkNest Dashboard</strong>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/dashboard" style={{ color: "#fff" }}>
            Home
          </Link>

          <Link to="/dashboard/create-user" style={{ color: "#fff" }}>
            Create User
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
