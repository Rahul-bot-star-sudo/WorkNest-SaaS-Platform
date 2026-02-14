import { getUser, logout } from "../utils/auth";

function Profile() {
  const user = getUser();

  return (
    <div>
      {user.name} ({user.role})
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
