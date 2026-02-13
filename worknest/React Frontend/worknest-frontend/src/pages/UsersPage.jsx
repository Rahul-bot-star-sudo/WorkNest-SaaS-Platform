import { useEffect, useState } from "react";
import {
  getUsersApi,
  updateUserRole,
  toggleUserStatus,
  deleteUser
} from "../services/user.api";
import "./styles/UsersPage.css";

function UsersPage({ embedded = false }) {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (searchValue = "", roleValue = "") => {
    try {
      setLoading(true);
      const data = await getUsersApi(roleValue, searchValue);
      setUsers(data);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search Enter Only
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchUsers(search, role);
    }
  };

  const handleRoleFilterChange = (e) => {
    const value = e.target.value;
    setRole(value);
    fetchUsers(search, value);
  };

  const clearFilters = () => {
    setSearch("");
    setRole("");
    fetchUsers("", "");
  };

  // 🔥 Inline Role Change
  const handleRoleChange = async (id, newRole) => {
    await updateUserRole(id, newRole);
    fetchUsers(search, role);
  };

  // 🔥 Toggle Status
  const handleToggleStatus = async (id) => {
    await toggleUserStatus(id);
    fetchUsers(search, role);
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    fetchUsers(search, role);
  };

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );

  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  const content = (
    <>
      <h2>User Management</h2>

      <div className="filters">
        <select value={role} onChange={handleRoleFilterChange}>
          <option value="">All Roles</option>
          <option value="MANAGER">Manager</option>
          <option value="HR">HR</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="INTERN">Intern</option>
        </select>

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />

        <button onClick={clearFilters}>Clear</button>
      </div>

      <p className="result-count">
        {users.length} user(s) found
      </p>
<div className="users-table-wrapper">
  <table className="users-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7">
                <div className="empty-state">
                  <h4>No users found</h4>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>

                {/* 🔥 Inline Role Dropdown */}
                <td>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value)
                    }
                  >
                    <option value="MANAGER">MANAGER</option>
                    <option value="HR">HR</option>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="INTERN">INTERN</option>
                  </select>
                </td>

                <td>
                  <span
                    className={
                      user.status === "ACTIVE"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {user.status}
                  </span>
                </td>

                <td>{user.priority}</td>

                <td>
                  <button onClick={() => handleToggleStatus(user.id)}>
                    {user.status === "ACTIVE"
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>

    </>
  );

  if (embedded) {
    return <div className="users-card">{content}</div>;
  }

  return (
    <div className="users-page">
      <div className="users-card">{content}</div>
    </div>
  );
}

export default UsersPage;
