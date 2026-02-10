import { getUser, logout } from "../utils/auth";
import "./ProfileSidebar.css";

function ProfileSidebar() {
  const user = getUser();

  if (!user) return null;

  const { name, email, role } = user;

  return (
    <aside className="profile-sidebar">
      <h3 className="profile-title">Profile</h3>

      <div className="profile-info">
        <p>
          <span className="label">Name</span>
          <span className="value">{name}</span>
        </p>

        <p>
          <span className="label">Email</span>
          <span className="value">{email}</span>
        </p>

        <p>
          <span className="label">Role</span>
          <span className="value">{role.role_code}</span>
        </p>

        <p>
          <span className="label">Priority</span>
          <span className="value">{role.priority}</span>
        </p>
      </div>

      <button className="btn-logout" onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

export default ProfileSidebar;
