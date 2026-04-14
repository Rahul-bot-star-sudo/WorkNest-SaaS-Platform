import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import RegisterSuperAdmin from "./RegisterSuperAdmin";
import "./styles/AuthWrapper.css";

function AuthWrapper() {
  const [page, setPage] = useState(
    localStorage.getItem("token") ? "dashboard" : "login"
  );

  const handleLogin = (role) => {
    localStorage.setItem("role", role);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setPage("login");
  };

  return (
    <div className="auth-wrapper">

      {page === "login" && (
        <div className="auth-card">
          <Login onLogin={handleLogin} />
          <p className="auth-link" onClick={() => setPage("register")}>
            Create Super Admin
          </p>
        </div>
      )}

      {page === "register" && (
        <div className="auth-card">
          <RegisterSuperAdmin />
          <p className="auth-link" onClick={() => setPage("login")}>
            Back to Login
          </p>
        </div>
      )}

      {page === "dashboard" && (
        <div className="dashboard-wrapper">
          <Dashboard />
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

    </div>
  );
}

export default AuthWrapper;