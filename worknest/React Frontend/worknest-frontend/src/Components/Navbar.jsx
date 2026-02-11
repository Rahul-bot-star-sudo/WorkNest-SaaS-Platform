import { useNavigate, useLocation } from "react-router-dom";
import Profile from "./Profile";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const goTo = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>

        <button
          onClick={() => goTo("/dashboard")}
          style={isActive("/dashboard") ? styles.active : {}}
        >
          Dashboard
        </button>

        {/* Register Access */}
        {user && ["SUPER_ADMIN", "ADMIN"].includes(user.role) && (
          <button
            onClick={() => goTo("/dashboard/create-user")}
            style={isActive("/dashboard/create-user") ? styles.active : {}}
          >
            Register User
          </button>
        )}

        {/* Users Access */}
        {user && ["SUPER_ADMIN", "ADMIN"].includes(user.role) && (
          <button
            onClick={() => goTo("/dashboard/users")}
            style={isActive("/dashboard/users") ? styles.active : {}}
          >
            Users
          </button>
        )}

      </div>

      <Profile />
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "#1f2937",
    color: "white",
  },
  left: {
    display: "flex",
    gap: "15px",
  },
  active: {
    backgroundColor: "#2563eb",
    color: "white",
  },
};

export default Navbar;
