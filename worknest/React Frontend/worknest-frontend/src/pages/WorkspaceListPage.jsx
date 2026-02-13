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

  const fetchData = async () => {
    try {
      const res = await getWorkspaces();
      setWorkspaces(res.data.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
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

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await deleteWorkspace(id);
    fetchData();
  };

  // Toggle Status
  const handleToggleStatus = async (id) => {
    await toggleWorkspaceStatus(id);
    fetchData();
  };

  // Start Edit
  const handleEdit = (ws) => {
    setEditingId(ws.id);
    setEditName(ws.name);
    setEditManagerId(ws.manager_id);
  };

  // Save Update
  const handleSave = async (id) => {
    await updateWorkspace(id, {
      name: editName,
      manager_id: editManagerId
    });

    setEditingId(null);
    fetchData();
  };

  return (
    <div className="workspace-page">
      <div className="workspace-card">
        <h2 className="workspace-title">Workspace List</h2>

        <ul className="workspace-list">
          {workspaces.map((ws) => (
            <li key={ws.id} className="workspace-item">

              {editingId === ws.id ? (
                // 🔥 EDIT MODE
                <div className="workspace-edit">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />

                  <select
                    value={editManagerId}
                    onChange={(e) => setEditManagerId(e.target.value)}
                  >
                    <option value="">Select Manager</option>
                    {managers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <button onClick={() => handleSave(ws.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                // 🔥 NORMAL VIEW
                <>
                  <div className="workspace-left">
                    <span className="workspace-name">{ws.name}</span>
                    <span className="workspace-manager">
                      Manager: {ws.manager_name || "Not Assigned"}
                    </span>
                  </div>

                  <div className="workspace-actions">
                    <span
                      className={`workspace-status ${
                        ws.status === "ACTIVE" ? "active" : "inactive"
                      }`}
                    >
                      {ws.status}
                    </span>

                    <button onClick={() => handleToggleStatus(ws.id)}>
                      {ws.status === "ACTIVE" ? "Deactivate" : "Activate"}
                    </button>

                    <button onClick={() => handleEdit(ws)}>Edit</button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(ws.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkspaceListPage;
