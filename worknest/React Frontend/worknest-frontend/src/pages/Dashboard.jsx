import { getUser } from "../utils/auth";
import Profile from "../Components/Profile";

function Dashboard() {
  const user = getUser();

  if (!user) {
    return <p>No user found</p>;
  }

  const roleCode = user.role.role_code;
  const priority = user.role.priority;

  return (
    <div style={styles.container}>
      {/* LEFT SIDE */}
      <Profile
        name={user.name}
        roleCode={roleCode}
        priority={priority}
      />

      {/* RIGHT SIDE */}
      <div style={styles.main}>
        <h1>Welcome {user.name}</h1>

        <p>
          Role: {roleCode} (Priority: {priority})
        </p>

        {/* ROLE BASED CONTENT */}
        {priority >= 100 && (
          <div>
            <h2>Super Admin Panel</h2>
            <p>System level controls</p>
          </div>
        )}

        {priority >= 90 && priority < 100 && (
          <div>
            <h2>Admin Panel</h2>
            <p>User management</p>
          </div>
        )}

        {priority < 90 && (
          <div>
            <h2>User Dashboard</h2>
            <p>Your activity summary</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
  },
  main: {
    flex: 1,
    padding: "20px",
  },
};

export default Dashboard;
