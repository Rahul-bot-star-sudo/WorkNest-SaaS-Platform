import { useEffect, useState } from "react";
import { createWorkspace, getWorkspaceTypes } from "../services/workspaceApi";
import { getUsersApi } from "../services/user.api";
import "./styles/createWorkspace.css";

function CreateWorkspacePage() {
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState("");
  const [types, setTypes] = useState([]);
  const [managerId, setManagerId] = useState("");
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Load workspace types
  useEffect(() => {
    const loadTypes = async () => {
      try {
        const res = await getWorkspaceTypes();
        setTypes(res.data.data);
      } catch (error) {
        console.error("Error loading types:", error);
        setError("Failed to load workspace types");
      }
    };

    loadTypes();
  }, []);

  // 🔹 Load managers (role = MANAGER)
  useEffect(() => {
    const loadManagers = async () => {
      try {
        const data = await getUsersApi("MANAGER", "");
        setManagers(data);
      } catch (error) {
        console.error("Error loading managers:", error);
      }
    };

    loadManagers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !typeId || !managerId) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createWorkspace({
        name,
        typeId,
        manager_id: managerId
      });

      alert("Workspace Created Successfully!");

      setName("");
      setTypeId("");
      setManagerId("");

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workspace-page">
      <div className="workspace-card">
        <h2 className="workspace-title">Create Workspace</h2>
        <p className="workspace-subtitle">
          Setup a new workspace in your organization
        </p>

        {error && <p className="error">{error}</p>}

        <form className="workspace-form" onSubmit={handleSubmit}>

          {/* Workspace Name */}
          <div className="form-group">
            <label>Workspace Name</label>
            <input
              type="text"
              placeholder="Enter workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Workspace Type */}
          <div className="form-group">
            <label>Workspace Type</label>
            <select
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
            >
              <option value="">Select Type</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Manager Dropdown */}
          <div className="form-group">
            <label>Select Manager</label>
            <select
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Workspace"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateWorkspacePage;
