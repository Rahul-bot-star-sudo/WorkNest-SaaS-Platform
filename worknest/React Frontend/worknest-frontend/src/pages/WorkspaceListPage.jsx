import { useEffect, useState } from "react";
import { getWorkspaces } from "../services/workspaceApi";
import "./styles/workspacelist.css";

function WorkspaceListPage() {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getWorkspaces();
        setWorkspaces(res.data.data);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="workspace-page">
      <div className="workspace-card">
        <h2 className="workspace-title">Workspace List</h2>
        <p className="workspace-subtitle">
          Manage all available workspaces
        </p>

        <ul className="workspace-list">
          {workspaces.map((ws) => (
            <li key={ws.id} className="workspace-item">
              <span className="workspace-name">{ws.name}</span>
              <span
                className={`workspace-status ${
                  ws.status === "ACTIVE" ? "active" : "inactive"
                }`}
              >
                {ws.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkspaceListPage;
