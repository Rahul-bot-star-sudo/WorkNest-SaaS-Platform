import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import RegisterSuperAdmin from "./components/RegisterSuperAdmin";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  // ✅ THEME LOAD
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []); // 🔥 IMPORTANT (dependency array)

  // 🔐 after login
  const handleLogin = (role) => {
    localStorage.setItem("role", role);
    setPage("dashboard");
  };

  // 🔓 logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setPage("login");
  };

  return (
    <div className="app">
      <Navbar />

      <main className="app-main">
        {page === "login" && (
          <div className="page-container">
            <Login onLogin={handleLogin} />
            <p 
              className="link-text"
              onClick={() => setPage("register")}
            >
              Create Super Admin
            </p>
          </div>
        )}

        {page === "register" && (
          <div className="page-container">
            <RegisterSuperAdmin />
            <p 
              className="link-text"
              onClick={() => setPage("login")}
            >
              Back to Login
            </p>
          </div>
        )}

        {page === "dashboard" && (
          <div className="page-container">
            <Dashboard />
            <button 
              className="logout-btn-bottom"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;