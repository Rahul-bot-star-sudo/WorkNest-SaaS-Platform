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
      const data = await getUsersApi(roleValue, searchValue);
      setUsers(data);
      setError("");
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search with debounce
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

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

  // 🔥 Inline Role Change with animation
  const handleRoleChange = async (id, newRole) => {
    setUpdatingId(id);
    try {
      await updateUserRole(id, newRole);
      await fetchUsers(search, role);
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  // 🔥 Toggle Status with animation
  const handleToggleStatus = async (id) => {
    setUpdatingId(id);
    try {
      await toggleUserStatus(id);
      await fetchUsers(search, role);
    } catch (error) {
      console.error("Failed to toggle status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  // 🔥 Delete with confirmation
  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = async (id) => {
    setUpdatingId(id);
    try {
      await deleteUser(id);
      setDeleteConfirm(null);
      await fetchUsers(search, role);
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  // Get priority class
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'HIGH': return 'priority-high';
      case 'MEDIUM': return 'priority-medium';
      case 'LOW': return 'priority-low';
      default: return '';
    }
  };

  if (loading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );

  if (error) return (
    <div className="users-page">
      <div className="users-card">
        <h3 style={{ color: "var(--danger)", textAlign: "center", padding: "2rem" }}>
          ⚠️ {error}
        </h3>
      </div>
    </div>
  );

  const content = (
    <>
      <h2>
        <span>User Management</span>
        <span style={{ fontSize: '1rem', marginLeft: 'auto', background: 'var(--gray-100)', padding: '0.5rem 1rem', borderRadius: '100px' }}>
          Total: {users.length}
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
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />

        <button onClick={clearFilters}>
          ✖ Clear Filters
        </button>
      </div>

      <p className="result-count">
        📊 {users.length} user(s) found
      </p>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>👤 Name</th>
              <th>📧 Email</th>
              <th>🎭 Role</th>
              <th>⚡ Status</th>
              <th>📊 Priority</th>
              <th>⚙️ Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7">
                  <div className="empty-state">
                    <h4>No users found</h4>
                    <p style={{ color: 'var(--gray-500)', marginTop: '1rem' }}>
                      Try adjusting your filters or search criteria
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr 
                  key={user.id}
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    opacity: updatingId === user.id ? 0.7 : 1,
                    transition: 'opacity 0.3s'
                  }}
                >
                  <td>#{user.id}</td>
                  <td>
                    <strong>{user.name}</strong>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                      {user.email}
                    </a>
                  </td>

                  {/* 🔥 Inline Role Dropdown */}
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={updatingId === user.id}
                      style={{ 
                        opacity: updatingId === user.id ? 0.5 : 1,
                        cursor: updatingId === user.id ? 'wait' : 'pointer'
                      }}
                    >
                      <option value="MANAGER">👔 MANAGER</option>
                      <option value="HR">🤝 HR</option>
                      <option value="EMPLOYEE">👨‍💻 EMPLOYEE</option>
                      <option value="INTERN">🎓 INTERN</option>
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
                      {user.status === "ACTIVE" ? "🟢 ACTIVE" : "🔴 INACTIVE"}
                    </span>
                  </td>

                  <td data-priority={user.priority}>
                    <span style={{
                      fontWeight: 'bold',
                      color: user.priority === 'HIGH' ? 'var(--danger)' : 
                             user.priority === 'MEDIUM' ? 'var(--warning)' : 'var(--success)'
                    }}>
                      {user.priority || 'N/A'}
                    </span>
                  </td>

                  <td>
                    {deleteConfirm === user.id ? (
                      <>
                        <button 
                          className="delete-btn"
                          onClick={() => confirmDelete(user.id)}
                          disabled={updatingId === user.id}
                        >
                          ✅ Confirm
                        </button>
                        <button 
                          onClick={cancelDelete}
                          disabled={updatingId === user.id}
                          style={{ background: 'var(--gray-300)' }}
                        >
                          ❌ Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleToggleStatus(user.id)}
                          disabled={updatingId === user.id}
                          data-tooltip={user.status === "ACTIVE" ? "Deactivate user" : "Activate user"}
                        >
                          {user.status === "ACTIVE" ? "🔴 Deactivate" : "🟢 Activate"}
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteClick(user.id)}
                          disabled={updatingId === user.id}
                          data-tooltip="Delete user"
                        >
                          🗑️ Delete
                        </button>
                      </>
                    )}
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