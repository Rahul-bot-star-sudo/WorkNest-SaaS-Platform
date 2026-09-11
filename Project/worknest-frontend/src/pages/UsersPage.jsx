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
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (searchValue = "", roleValue = "") => {
    try {
      setLoading(true);

      const response = await getUsersApi(roleValue, searchValue);

      // ✅ SAFE DATA EXTRACTION
      const usersArray = Array.isArray(response)
        ? response
        : response?.data || [];

      setUsers(usersArray);
      setError("");
    } catch (err) {
      setUsers([]); // prevent undefined
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

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

  const handleRoleChange = async (id, newRole) => {
    setUpdatingId(id);
    try {
      await updateUserRole(id, newRole);
      await fetchUsers(search, role);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleStatus = async (id) => {
    setUpdatingId(id);
    try {
      await toggleUserStatus(id);
      await fetchUsers(search, role);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteClick = (id) => setDeleteConfirm(id);

  const confirmDelete = async (id) => {
    setUpdatingId(id);
    try {
      await deleteUser(id);
      setDeleteConfirm(null);
      await fetchUsers(search, role);
    } finally {
      setUpdatingId(null);
    }
  };

  const cancelDelete = () => setDeleteConfirm(null);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-page">
        <div className="users-card">
          <h3 style={{ color: "red", textAlign: "center", padding: "2rem" }}>
            ⚠️ {error}
          </h3>
        </div>
      </div>
    );
  }

  const content = (
    <>
      <h2>
        User Management
        <span style={{ marginLeft: "auto" }}>
          Total: {users?.length || 0}
        </span>
      </h2>

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
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />

        <button onClick={clearFilters}>Clear</button>
      </div>

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
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {!users || users.length === 0 ? (
              <tr>
                <td colSpan="8">No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      disabled={updatingId === user.id}
                    >
                      <option value="MANAGER">MANAGER</option>
                      <option value="HR">HR</option>
                      <option value="EMPLOYEE">EMPLOYEE</option>
                      <option value="INTERN">INTERN</option>
                    </select>
                  </td>

                  <td>
                    {user.status === "ACTIVE" ? "🟢 ACTIVE" : "🔴 INACTIVE"}
                  </td>

                  <td>
                    <span
                      style={{
                        fontWeight: "bold",
                        color:
                          user.priority >= 80
                            ? "red"
                            : user.priority >= 60
                            ? "orange"
                            : "green"
                      }}
                    >
                      {user.priority}
                    </span>
                  </td>

                  <td>{user.company_name || "N/A"}</td>

                  <td>
                    <button onClick={() => handleToggleStatus(user.id)}>
                      {user.status === "ACTIVE"
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteClick(user.id)}
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