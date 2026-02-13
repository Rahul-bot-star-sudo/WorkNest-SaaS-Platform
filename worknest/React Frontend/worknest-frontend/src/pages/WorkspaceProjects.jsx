import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken, getUser } from "../utils/auth";

function WorkspaceProjects() {

  const { id } = useParams();
  const user = getUser();

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [taskInputs, setTaskInputs] = useState({});

  /* ================= PROJECT FUNCTIONS ================= */

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/projects/workspace/${id}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      setProjects(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/projects",
        {
          name,
          description,
          workspace_id: id,
          owner_id: user.userId
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );

      setName("");
      setDescription("");
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= USER FUNCTIONS ================= */

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/users",
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= TASK FUNCTIONS ================= */

  const fetchTasks = async (projectId) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/tasks/project/${projectId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );

      setTasks(prev => ({
        ...prev,
        [projectId]: res.data.data
      }));

    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (projectId) => {
    const input = taskInputs[projectId];

    if (!input?.title) return;

    try {
      await axios.post(
        "http://localhost:4000/api/tasks",
        {
          title: input.title,
          description: input.description,
          project_id: projectId,
          assigned_to: input.assignedTo,
          due_date: input.dueDate
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );

      setTaskInputs(prev => ({
        ...prev,
        [projectId]: { title: "", description: "", assignedTo: "", dueDate: "" }
      }));

      fetchTasks(projectId);

    } catch (error) {
      console.log(error);
    }
  };

  /* ================= USE EFFECT ================= */

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, [id]);

  /* ================= UI ================= */

  return (
    <div style={{ padding: "20px" }}>
      <h2>Projects</h2>

      {/* Create Project */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createProject}>
          Create Project
        </button>
      </div>

      {/* Project List */}
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px"
            }}
          >
            <h3>{project.name}</h3>
            <p>{project.description}</p>

            {/* Owner */}
            <label>Owner: </label>
            <select
              value={project.owner_id}
              onChange={async (e) => {
                await axios.patch(
                  `http://localhost:4000/api/projects/${project.id}/owner`,
                  { owner_id: e.target.value },
                  {
                    headers: { Authorization: `Bearer ${getToken()}` }
                  }
                );
                fetchProjects();
              }}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            {/* Status */}
            <label style={{ marginLeft: "10px" }}>Status: </label>
            <select
              value={project.status}
              onChange={async (e) => {
                await axios.patch(
                  `http://localhost:4000/api/projects/${project.id}/status`,
                  { status: e.target.value },
                  {
                    headers: { Authorization: `Bearer ${getToken()}` }
                  }
                );
                fetchProjects();
              }}
            >
              <option value="PLANNING">PLANNING</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="ON_HOLD">ON_HOLD</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>

            <br /><br />

            <button onClick={() => fetchTasks(project.id)}>
              View Tasks
            </button>

            {/* Tasks */}
            {tasks[project.id] && (
              tasks[project.id].map(task => (
                <div
                  key={task.id}
                  style={{
                    marginTop: "10px",
                    padding: "10px",
                    border: "1px solid #ddd"
                  }}
                >
                  <strong>{task.title}</strong>
                  <p>Assigned: {task.assigned_name}</p>

                  <label>Status: </label>
                  <select
                    value={task.status}
                    onChange={async (e) => {
                      await axios.patch(
                        `http://localhost:4000/api/tasks/${task.id}`,
                        {
                          status: e.target.value,
                          priority: task.priority
                        },
                        {
                          headers: { Authorization: `Bearer ${getToken()}` }
                        }
                      );
                      fetchTasks(project.id);
                    }}
                  >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>

                  <label style={{ marginLeft: "10px" }}>Priority: </label>
                  <select
                    value={task.priority}
                    onChange={async (e) => {
                      await axios.patch(
                        `http://localhost:4000/api/tasks/${task.id}`,
                        {
                          status: task.status,
                          priority: e.target.value
                        },
                        {
                          headers: { Authorization: `Bearer ${getToken()}` }
                        }
                      );
                      fetchTasks(project.id);
                    }}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>

                  {/* Delete Task Button */}
                  <button
                    style={{ marginLeft: "10px", background: "red", color: "white" }}
                    onClick={async () => {
                      await axios.delete(
                        `http://localhost:4000/api/tasks/${task.id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${getToken()}`
                          }
                        }
                      );

                      fetchTasks(project.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}

            {/* Add Task */}
            <hr />
            <h4>Add Task</h4>

            <input
              type="text"
              placeholder="Task Title"
              value={taskInputs[project.id]?.title || ""}
              onChange={(e) =>
                setTaskInputs(prev => ({
                  ...prev,
                  [project.id]: {
                    ...prev[project.id],
                    title: e.target.value
                  }
                }))
              }
            />

            <input
              type="text"
              placeholder="Task Description"
              value={taskInputs[project.id]?.description || ""}
              onChange={(e) =>
                setTaskInputs(prev => ({
                  ...prev,
                  [project.id]: {
                    ...prev[project.id],
                    description: e.target.value
                  }
                }))
              }
            />

            <select
              value={taskInputs[project.id]?.assignedTo || ""}
              onChange={(e) =>
                setTaskInputs(prev => ({
                  ...prev,
                  [project.id]: {
                    ...prev[project.id],
                    assignedTo: e.target.value
                  }
                }))
              }
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={taskInputs[project.id]?.dueDate || ""}
              onChange={(e) =>
                setTaskInputs(prev => ({
                  ...prev,
                  [project.id]: {
                    ...prev[project.id],
                    dueDate: e.target.value
                  }
                }))
              }
            />

            <button onClick={() => createTask(project.id)}>
              Create Task
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default WorkspaceProjects;