import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser, getToken } from "../utils/auth";
import { getMyWorkspaces } from "../services/workspaceApi";
import "./styles/dashboard.css";

function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [count, setCount] = useState(0);
  const [myTasks, setMyTasks] = useState([]);
  const [summary, setSummary] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [teamUpdates, setTeamUpdates] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [loading, setLoading] = useState(true); // Single loading state
  const [error, setError] = useState(null);

  const user = getUser();
  const navigate = useNavigate();

  // ✅ Check if user exists immediately
  useEffect(() => {
    if (!user || !getToken()) {
      console.log("No user or token found, redirecting to login");
      navigate("/login", { replace: true });
      return;
    }
  }, [user, navigate]);

  const roleCode = user?.role?.role_code;
  const priority = user?.role?.priority;

  const isManager = roleCode === "MANAGER";
  const isAdmin = roleCode === "ADMIN" || roleCode === "SUPER_ADMIN";

  // ✅ Fetch all data with error handling
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.allSettled([
        fetchMyTasks(),
        fetchSummary(),
        fetchRecentActivities(),
        ...((isManager || isAdmin) ? [fetchWorkspaces(), fetchTeamUpdates()] : [])
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Some data couldn't be loaded. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch my tasks
  const fetchMyTasks = async () => {
    try {
      const token = getToken();
      if (!token) return;
      
      const res = await axios.get(
        "http://localhost:4000/api/tasks/my-tasks",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (res.data && res.data.data) {
        setMyTasks(res.data.data);
        
        // Calculate upcoming deadlines
        const now = new Date();
        const upcoming = res.data.data
          .filter(task => task.status !== "DONE" && task.due_date)
          .map(task => ({
            ...task,
            daysLeft: Math.ceil((new Date(task.due_date) - now) / (1000 * 60 * 60 * 24))
          }))
          .filter(task => task.daysLeft <= 7 && task.daysLeft >= 0)
          .sort((a, b) => a.daysLeft - b.daysLeft)
          .slice(0, 5);
        
        setUpcomingDeadlines(upcoming);
      }
    } catch (error) {
      console.log("Error fetching tasks:", error);
      setMyTasks([]);
    }
  };

  // Fetch workspaces
  const fetchWorkspaces = async () => {
    try {
      const res = await getMyWorkspaces();
      if (res?.data?.success) {
        setWorkspaces(res.data.data || []);
        setCount(res.data.count || 0);
      }
    } catch (error) {
      console.log("Workspace Fetch Error:", error);
      setWorkspaces([]);
      setCount(0);
    }
  };

  // Fetch task summary
  const fetchSummary = async () => {
    try {
      const token = getToken();
      if (!token) return;
      
      const res = await axios.get(
        "http://localhost:4000/api/tasks/summary",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSummary(res.data.data);
    } catch (error) {
      console.log("Error fetching summary:", error);
      setSummary(null);
    }
  };

  // Fetch recent activities (mock data for now)
  const fetchRecentActivities = async () => {
    try {
      const activities = [
        { id: 1, message: 'Welcome to your dashboard!', time: 'Just now', user: user?.name },
        { id: 2, message: 'Start by creating your first task', time: 'Recently', user: user?.name },
        { id: 3, message: 'Check your pending tasks', time: 'Recently', user: user?.name }
      ];
      setRecentActivities(activities);
    } catch (error) {
      console.log(error);
      setRecentActivities([]);
    }
  };

  // Fetch team updates (for managers/admins)
  const fetchTeamUpdates = async () => {
    try {
      const updates = [
        { id: 1, teamMember: 'Team Member', action: 'active', time: 'Recently', initials: 'TM' }
      ];
      setTeamUpdates(updates);
    } catch (error) {
      console.log(error);
      setTeamUpdates([]);
    }
  };

  useEffect(() => {
    if (user && getToken()) {
      fetchAllData();
    }
  }, []);

  // Handle status change
  const handleStatusChange = async (taskId, newStatus, taskPriority) => {
    try {
      const token = getToken();
      if (!token) return;
      
      await axios.patch(
        `http://localhost:4000/api/tasks/${taskId}`,
        { status: newStatus, priority: taskPriority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh data after status change
      await Promise.allSettled([fetchMyTasks(), fetchSummary(), fetchRecentActivities()]);
    } catch (error) {
      console.log("Error updating task:", error);
    }
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

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'DONE': return 'var(--success-color)';
      case 'IN_PROGRESS': return 'var(--warning-color)';
      case 'TODO': return 'var(--info-color)';
      default: return 'var(--text-muted)';
    }
  };

  // Calculate productivity score
  const calculateProductivity = () => {
    if (!summary || summary.total === 0) return 0;
    return Math.round((summary.completed / summary.total) * 100);
  };

  // ✅ Show loading state
  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // ✅ Show error state
  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-state">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // ✅ Show no user state
  if (!user) {
    return (
      <div className="dashboard-error">
        <div className="error-state">
          <h3>Session Expired</h3>
          <p>Please login again to continue</p>
          <button className="btn-primary" onClick={() => navigate('/login', { replace: true })}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="page-title">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <div className="user-badges">
            <span className="role-badge">{roleCode || 'USER'}</span>
            {priority && (
              <span className={`priority-badge ${getPriorityClass(priority)}`}>
                {priority} Priority
              </span>
            )}
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="time-range">
          <button 
            className={`time-range-btn ${selectedTimeRange === 'day' ? 'active' : ''}`}
            onClick={() => setSelectedTimeRange('day')}
          >
            Day
          </button>
          <button 
            className={`time-range-btn ${selectedTimeRange === 'week' ? 'active' : ''}`}
            onClick={() => setSelectedTimeRange('week')}
          >
            Week
          </button>
          <button 
            className={`time-range-btn ${selectedTimeRange === 'month' ? 'active' : ''}`}
            onClick={() => setSelectedTimeRange('month')}
          >
            Month
          </button>
        </div>
      </div>

      {/* Analytics Section */}
      <section className="analytics-section">
        <div className="section-header">
          <h2>Analytics Overview</h2>
          <div className="productivity-badge">
            <span>Productivity</span>
            <strong>{calculateProductivity()}%</strong>
          </div>
        </div>
        
        {summary ? (
          <>
            <div className="stats-grid">
              <div className="stat-card total">
                <div className="stat-icon">📋</div>
                <div className="stat-content">
                  <span className="stat-value">{summary.total || 0}</span>
                  <span className="stat-label">Total Tasks</span>
                </div>
              </div>
              <div className="stat-card completed">
                <div className="stat-icon">✓</div>
                <div className="stat-content">
                  <span className="stat-value">{summary.completed || 0}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <div className="stat-card in-progress">
                <div className="stat-icon">⟳</div>
                <div className="stat-content">
                  <span className="stat-value">{summary.in_progress || 0}</span>
                  <span className="stat-label">In Progress</span>
                </div>
              </div>
              <div className="stat-card overdue">
                <div className="stat-icon">!</div>
                <div className="stat-content">
                  <span className="stat-value">{summary.overdue || 0}</span>
                  <span className="stat-label">Overdue</span>
                </div>
              </div>
            </div>

            {summary.total > 0 && (
              <div className="progress-section">
                <div className="progress-header">
                  <span>Overall Progress</span>
                  <span className="progress-percentage">
                    {Math.round((summary.completed / summary.total) * 100)}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(summary.completed / summary.total) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">No data available</div>
        )}
      </section>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* My Tasks */}
        <section className="content-card">
          <div className="card-header">
            <h3>My Tasks</h3>
            <button 
              className="view-link"
              onClick={() => navigate('/dashboard/tasks')}
            >
              View All →
            </button>
          </div>

          {myTasks.length === 0 ? (
            <div className="empty-state small">
              <p>No tasks assigned</p>
              <button 
                className="btn-link"
                onClick={() => navigate('/dashboard/tasks/create')}
              >
                Create Task
              </button>
            </div>
          ) : (
            <div className="tasks-list">
              {myTasks.slice(0, 5).map(task => {
                const isOverdue = task.status !== "DONE" && 
                                 task.due_date && 
                                 new Date(task.due_date) < new Date();
                
                return (
                  <div 
                    key={task.id} 
                    className={`task-item ${isOverdue ? 'overdue' : ''}`}
                    onClick={() => navigate(`/dashboard/task/${task.id}`)}
                  >
                    <div className="task-status">
                      <span 
                        className="status-indicator" 
                        style={{ backgroundColor: getStatusColor(task.status) }}
                      />
                    </div>
                    <div className="task-content">
                      <div className="task-title-row">
                        <span className="task-title">{task.title}</span>
                        <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="task-meta">
                        <span className="task-project">
                          {task.project_name || "No Project"}
                        </span>
                        {task.due_date && (
                          <span className={`task-due ${isOverdue ? 'overdue' : ''}`}>
                            Due {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="task-actions">
                      <select
                        className="status-select"
                        value={task.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(task.id, e.target.value, task.priority)}
                      >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Upcoming Deadlines */}
        <section className="content-card">
          <div className="card-header">
            <h3>Upcoming Deadlines</h3>
            <span className="badge">{upcomingDeadlines.length}</span>
          </div>

          {upcomingDeadlines.length === 0 ? (
            <div className="empty-state small">
              <p>No upcoming deadlines</p>
            </div>
          ) : (
            <div className="deadlines-list">
              {upcomingDeadlines.map(task => (
                <div 
                  key={task.id} 
                  className="deadline-item"
                  onClick={() => navigate(`/dashboard/task/${task.id}`)}
                >
                  <div className="deadline-content">
                    <div className="deadline-title">{task.title}</div>
                    <div className="deadline-project">{task.project_name}</div>
                  </div>
                  <div className={`deadline-tag ${task.daysLeft <= 2 ? 'urgent' : ''}`}>
                    {task.daysLeft === 0 ? 'Today' : 
                     task.daysLeft === 1 ? 'Tomorrow' : 
                     `${task.daysLeft} days`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Activity */}
        <section className="content-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>

          <div className="activities-list">
            {recentActivities.length === 0 ? (
              <div className="empty-state small">
                <p>No recent activity</p>
              </div>
            ) : (
              recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-content">
                    <p className="activity-message">{activity.message}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Workspaces (for managers/admins) */}
        {(isManager || isAdmin) && (
          <section className="content-card">
            <div className="card-header">
              <h3>My Workspaces</h3>
              <button 
                className="btn-create"
                onClick={() => navigate('/dashboard/workspaces/create')}
              >
                + New
              </button>
            </div>
            
            {workspaces.length === 0 ? (
              <div className="empty-state small">
                <p>No workspaces assigned</p>
                <button 
                  className="btn-link"
                  onClick={() => navigate('/dashboard/workspaces/create')}
                >
                  Create Workspace
                </button>
              </div>
            ) : (
              <>
                <div className="workspaces-grid">
                  {workspaces.slice(0, 4).map((ws) => (
                    <div
                      key={ws.id}
                      className="workspace-item"
                      onClick={() => navigate(`/dashboard/workspace/${ws.id}`)}
                    >
                      <div className="workspace-name">{ws.name}</div>
                      <div className="workspace-stats">
                        <span>{ws.member_count || 0} members</span>
                        <span>•</span>
                        <span>{ws.project_count || 0} projects</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {count > 4 && (
                  <div className="view-all">
                    <button 
                      className="view-link"
                      onClick={() => navigate('/dashboard/workspaces')}
                    >
                      View all {count} workspaces →
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;