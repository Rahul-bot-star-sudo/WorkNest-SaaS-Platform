import { getUser } from "../utils/auth";
import Navbar from "../components/Navbar";

function Dashboard() {
  const user = getUser();

  return (
    <>
      <Navbar />
      <h1>Welcome {user.name}</h1>

      {user.role === "SUPER_ADMIN" && <div>Super Admin Panel</div>}
      {user.role === "ADMIN" && <div>Admin Panel</div>}
      {user.role === "USER" && <div>User Panel</div>}
    </>
  );
}

export default Dashboard;
