import { useEffect, useState } from "react";
import {
  getWorkspaces,
  deleteWorkspace,
  toggleWorkspaceStatus,
  updateWorkspace
} from "../services/workspaceApi";
import "./styles/workspacelist.css";
import axios from "axios";
import { getToken } from "../utils/auth";

function WorkspaceListPage() {
  const [workspaces, setWorkspaces] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editManagerId, setEditManagerId] = useState("");
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getWorkspaces();
      setWorkspaces(res.data.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    loadManagers();
  }, []);

  // Load Managers
  const loadManagers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/users?role=MANAGER",
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      setManagers(res.data.data);
    } catch (error) {
      console.error("Error loading managers:", error);
    }
  };

  // Delete with animation
  const handleDelete = async (id) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = async (id) => {
    await deleteWorkspace(id);
    setShowDeleteConfirm(null);
    fetchData();
  };

  // Toggle Status with animation
  const handleToggleStatus = async (id) => {
    const workspace = workspaces.find(w => w.id === id);
    const newStatus = workspace.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    
    // Add animation class
    const element = document.getElementById(`workspace-${id}`);
    element.style.transform = 'scale(0.98)';
    
    await toggleWorkspaceStatus(id);
    
    setTimeout(() => {
      if (element) {
        element.style.transform = '';
      }
    }, 200);
    
    fetchData();
  };

  // Start Edit
  const handleEdit = (ws) => {
    setEditingId(ws.id);
    setEditName(ws.name);
    setEditManagerId(ws.manager_id || "");
  };

  // Save Update
  const handleSave = async (id) => {
    await updateWorkspace(id, {
      name: editName,
      manager_id: editManagerId || null
    });

    setEditingId(null);
    fetchData();
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="workspace-page">
      <div className="workspace-card">
        <div className="workspace-header">
          <h2 className="workspace-title">
            Workspace List
          </h2>
          <div className="workspace-stats">
            <span>Total: {workspaces.length}</span>
            <span>Active: {workspaces.filter(w => w.status === "ACTIVE").length}</span>
          </div>
        </div>

        {loading ? (
          // Loading Skeletons
          <div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="loading-skeleton" />
            ))}
          </div>
        ) : workspaces.length === 0 ? (
          // Empty State
          <div className="empty-state">
            <div className="empty-state-icon">🏢</div>
            <h3>No Workspaces Found</h3>
            <p>Get started by creating your first workspace!</p>
            <button onClick={() => window.location.href = '/create-workspace'}>
              Create Workspace
            </button>
          </div>
        ) : (
          <ul className="workspace-list">
            {workspaces.map((ws, index) => (
              <li 
                key={ws.id} 
                id={`workspace-${ws.id}`}
                className="workspace-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {editingId === ws.id ? (
                  // 🔥 EDIT MODE
                  <div className="workspace-edit">
                    <div className="edit-row">
                      <div className="edit-field">
                        <label>Workspace Name</label>
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Enter workspace name"
                          autoFocus
                        />
                      </div>

                      <div className="edit-field">
                        <label>Assign Manager</label>
                        <select
                          value={editManagerId}
                          onChange={(e) => setEditManagerId(e.target.value)}
                        >
                          <option value="">Select Manager</option>
                          {managers.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.email})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="edit-actions">
                      <button onClick={() => handleSave(ws.id)}>
                        💾 Save Changes
                      </button>
                      <button onClick={() => setEditingId(null)}>
                        ✖ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // 🔥 NORMAL VIEW
                  <div className="workspace-content">
                    <div className="workspace-left">
                      <span className="workspace-name">{ws.name}</span>
                      <div className="manager-info">
                        <span className="manager-avatar">
                          {ws.manager_name ? getInitials(ws.manager_name) : '?'}
                        </span>
                        <span className="workspace-manager">
                          Manager: {ws.manager_name || "Not Assigned"}
                        </span>
                      </div>
                    </div>

                    <div className="workspace-actions">
                      <span
                        className={`workspace-status ${
                          ws.status === "ACTIVE" ? "active" : "inactive"
                        }`}
                        data-tooltip={ws.status === "ACTIVE" ? "Workspace is active" : "Workspace is inactive"}
                      >
                        {ws.status}
                      </span>

                      <button 
                        onClick={() => handleToggleStatus(ws.id)}
                        data-tooltip={ws.status === "ACTIVE" ? "Deactivate workspace" : "Activate workspace"}
                      >
                        {ws.status === "ACTIVE" ? "🔴 Deactivate" : "🟢 Activate"}
                      </button>

                      <button 
                        onClick={() => handleEdit(ws)}
                        data-tooltip="Edit workspace details"
                      >
                        ✏️ Edit
                      </button>

                      {showDeleteConfirm === ws.id ? (
                        <>
                          <button 
                            className="delete-btn"
                            onClick={() => confirmDelete(ws.id)}
                            data-tooltip="Confirm delete"
                          >
                            ✅ Confirm
                          </button>
                          <button 
                            onClick={() => setShowDeleteConfirm(null)}
                            data-tooltip="Cancel"
                          >
                            ❌ Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(ws.id)}
                          data-tooltip="Delete workspace"
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WorkspaceListPage;