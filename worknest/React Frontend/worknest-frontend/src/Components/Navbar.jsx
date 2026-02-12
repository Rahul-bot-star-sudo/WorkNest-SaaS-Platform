import { useNavigate, useLocation } from "react-router-dom";

console.log("Navbar Rendered");

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const roleCode = user?.role?.role_code; // 🔥 Correct role extraction

  const goTo = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isAdmin = ["SUPER_ADMIN", "ADMIN"].includes(roleCode);

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>

        {/* Dashboard */}
        <button
          onClick={() => goTo("/dashboard")}
          style={isActive("/dashboard") ? styles.active : styles.button}
        >
          Dashboard
        </button>

        {/* Register User */}
        {isAdmin && (
          <button
            onClick={() => goTo("/dashboard/create-user")}
            style={isActive("/dashboard/create-user") ? styles.active : styles.button}
          >
            Register User
          </button>
        )}

        {/* Users */}
        {isAdmin && (
          <button
            onClick={() => goTo("/dashboard/users")}
            style={isActive("/dashboard/users") ? styles.active : styles.button}
          >
            Users
          </button>
        )}

        {/* Workspace List */}
        {isAdmin && (
          <button
            onClick={() => goTo("/dashboard/workspaces")}
            style={isActive("/workspaces") ? styles.active : styles.button}
          >
            Workspaces
          </button>
        )}

        {/* Create Workspace */}
        {isAdmin && (
          <button
            onClick={() => goTo("/dashboard/workspaces/create")}
            style={isActive("/workspaces/create") ? styles.active : styles.button}
          >
            Create Workspace
          </button>
        )}

      </div>

      
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
  button: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "6px 10px",
  },
  active: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
};

export default Navbar;
