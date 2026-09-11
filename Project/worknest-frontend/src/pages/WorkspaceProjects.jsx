import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getToken, getUser } from "../utils/auth";
import "./WorkspaceProjects.css";

function WorkspaceProjects() {
  const { id } = useParams();
  const user = getUser();

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!name.trim()) return;
    
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
      
      // Show success notification
      showNotification("Project created successfully!", "success");
    } catch (error) {
      console.log(error);
      showNotification("Failed to create project", "error");
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
      showNotification("Task created successfully!", "success");

    } catch (error) {
      console.log(error);
      showNotification("Failed to create task", "error");
    }
  };

  const updateTaskStatus = async (taskId, newStatus, priority, projectId) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/tasks/${taskId}`,
        {
          status: newStatus,
          priority: priority
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      fetchTasks(projectId);
      showNotification("Task updated successfully!", "success");
    } catch (error) {
      console.log(error);
      showNotification("Failed to update task", "error");
    }
  };

  const updateTaskPriority = async (taskId, newPriority, status, projectId) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/tasks/${taskId}`,
        {
          status: status,
          priority: newPriority
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      fetchTasks(projectId);
      showNotification("Task priority updated!", "success");
    } catch (error) {
      console.log(error);
      showNotification("Failed to update priority", "error");
    }
  };

  const deleteTask = async (taskId, projectId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await axios.delete(
        `http://localhost:4000/api/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      fetchTasks(projectId);
      showNotification("Task deleted successfully!", "success");
    } catch (error) {
      console.log(error);
      showNotification("Failed to delete task", "error");
    }
  };

  const updateProjectOwner = async (projectId, ownerId) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/projects/${projectId}/owner`,
        { owner_id: ownerId },
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      fetchProjects();
      showNotification("Project owner updated!", "success");
    } catch (error) {
      console.log(error);
      showNotification("Failed to update owner", "error");
    }
  };

  const updateProjectStatus = async (projectId, status) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/projects/${projectId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${getToken()}` }
        }
      );
      fetchProjects();
      showNotification("Project status updated!", "success");
    } catch (error) {
      console.log(error);
      showNotification("Failed to update status", "error");
    }
  };

  /* ================= NOTIFICATION ================= */

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  /* ================= USE EFFECT ================= */

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, [id]);

  /* ================= UI ================= */

  const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'planning': return 'planning';
      case 'in_progress': return 'in-progress';
      case 'on_hold': return 'on-hold';
      case 'completed': return 'completed';
      case 'cancelled': return 'cancelled';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="workspace-projects">
        <div className="projects-bg">
          <div className="bg-gradient"></div>
          <div className="bg-particles"></div>
        </div>
        <div className="projects-container">
          <div className="loading-projects">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace-projects">
      {/* Animated Background */}
      <div className="projects-bg">
        <div className="bg-gradient"></div>
        <div className="bg-particles"></div>
      </div>

      <div className="projects-container">
        {/* Header */}
        <div className="projects-header">
          <div className="header-left">
            <div className="header-icon">📊</div>
            <div>
              <h1 className="header-title">Workspace Projects</h1>
              <p className="header-subtitle">Manage your projects and tasks</p>
            </div>
          </div>
        </div>

        {/* Create Project */}
        <div className="create-project-card">
          <h3 className="create-project-title">
            Create New Project
            <span>Workspace #{id}</span>
          </h3>
          <div className="create-project-form">
            <div className="input-wrapper">
              <span className="input-icon">📋</span>
              <input
                type="text"
                className="input-field"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <span className="input-icon">📝</span>
              <input
                type="text"
                className="input-field"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="create-btn" onClick={createProject}>
              Create Project
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h3>No Projects Yet</h3>
            <p>Create your first project to get started</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="card-glow"></div>
                
                <div className="project-header">
                  <div className="project-title-section">
                    <h3 className="project-title">
                      {project.name}
                      <span className="project-badge">ID: {project.id}</span>
                    </h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                  <span className={`status-badge ${getStatusClass(project.status)}`}>
                    {project.status?.replace('_', ' ')}
                  </span>
                </div>

                {/* Project Controls */}
                <div className="project-controls">
                  <div className="control-group">
                    <label className="control-label">Owner</label>
                    <select
                      className="control-select"
                      value={project.owner_id}
                      onChange={(e) => updateProjectOwner(project.id, e.target.value)}
                    >
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="control-group">
                    <label className="control-label">Status</label>
                    <select
                      className="control-select"
                      value={project.status}
                      onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                    >
                      <option value="PLANNING">PLANNING</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="ON_HOLD">ON HOLD</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                {/* View Tasks Button */}
                <button 
                  className="view-tasks-btn"
                  onClick={() => fetchTasks(project.id)}
                >
                  <span>📋</span>
                  View Tasks
                  <span>{tasks[project.id] ? `(${tasks[project.id].length})` : ''}</span>
                </button>

                {/* Tasks Section */}
                {tasks[project.id] && tasks[project.id].length > 0 && (
                  <div className="tasks-section">
                    <div className="tasks-header">
                      <h4>Tasks</h4>
                      <span className="tasks-count">{tasks[project.id].length}</span>
                    </div>
                    
                    {tasks[project.id].map(task => (
                      <div key={task.id} className="task-item">
                        <div className="task-header">
                          <span className="task-title">{task.title}</span>
                          <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        
                        <div className="task-assignee">
                          <span className="assignee-icon">👤</span>
                          {task.assigned_name || 'Unassigned'}
                        </div>

                        <div className="task-controls">
                          <select
                            className="task-select"
                            value={task.status}
                            onChange={(e) => updateTaskStatus(
                              task.id, 
                              e.target.value, 
                              task.priority,
                              project.id
                            )}
                          >
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                          </select>

                          <select
                            className="task-select"
                            value={task.priority}
                            onChange={(e) => updateTaskPriority(
                              task.id,
                              e.target.value,
                              task.status,
                              project.id
                            )}
                          >
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                          </select>

                          <button
                            className="task-delete-btn"
                            onClick={() => deleteTask(task.id, project.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Task Form */}
                <div className="add-task-section">
                  <h5 className="add-task-title">
                    <span>➕</span>
                    Add New Task
                  </h5>
                  <div className="add-task-form">
                    <input
                      type="text"
                      className="task-input"
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
                      className="task-input"
                      placeholder="Description"
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
                      className="task-select-small"
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
                      <option value="">Assign to</option>
                      {users.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      className="task-input"
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
                    <button 
                      className="create-task-btn"
                      onClick={() => createTask(project.id)}
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkspaceProjects;