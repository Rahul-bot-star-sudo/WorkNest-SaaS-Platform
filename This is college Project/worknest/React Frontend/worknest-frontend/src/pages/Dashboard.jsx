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
  const [loading, setLoading] = useState({
    tasks: true,
    workspaces: true,
    summary: true,
    activities: true
  });

  const user = getUser();
  const navigate = useNavigate();

  const roleCode = user?.role?.role_code;
  const priority = user?.role?.priority;

  const isManager = roleCode === "MANAGER";
  const isAdmin = roleCode === "ADMIN" || roleCode === "SUPER_ADMIN";

  // Fetch my tasks
  const fetchMyTasks = async () => {
    setLoading(prev => ({ ...prev, tasks: true }));
    try {
      const res = await axios.get(
        "http://localhost:4000/api/tasks/my-tasks",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(prev => ({ ...prev, tasks: false }));
    }
  };

  // Fetch workspaces
  const fetchWorkspaces = async () => {
    setLoading(prev => ({ ...prev, workspaces: true }));
    try {
      const res = await getMyWorkspaces();
      if (res.data && res.data.success) {
        setWorkspaces(res.data.data || []);
        setCount(res.data.count || 0);
      }
    } catch (error) {
      console.log("Workspace Fetch Error:", error.response?.data || error);
    } finally {
      setLoading(prev => ({ ...prev, workspaces: false }));
    }
  };

  // Fetch task summary
  const fetchSummary = async () => {
    setLoading(prev => ({ ...prev, summary: true }));
    try {
      const res = await axios.get(
        "http://localhost:4000/api/tasks/summary",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      setSummary(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(prev => ({ ...prev, summary: false }));
    }
  };

  // Fetch recent activities
  const fetchRecentActivities = async () => {
    setLoading(prev => ({ ...prev, activities: true }));
    try {
      const activities = [
        {
          id: 1,
          message: 'Completed task "Update documentation"',
          time: '5 minutes ago',
          user: user.name
        },
        {
          id: 2,
          message: 'Joined workspace "Project Alpha"',
          time: '1 hour ago',
          user: user.name
        },
        {
          id: 3,
          message: 'Created new task "Review PR"',
          time: '3 hours ago',
          user: user.name
        },
        {
          id: 4,
          message: 'Changed task status to In Progress',
          time: '5 hours ago',
          user: user.name
        }
      ];
      setRecentActivities(activities);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(prev => ({ ...prev, activities: false }));
    }
  };

  // Fetch team updates (for managers/admins)
  const fetchTeamUpdates = async () => {
    if (!isManager && !isAdmin) return;
    
    try {
      const updates = [
        {
          id: 1,
          teamMember: 'John Doe',
          action: 'completed 3 tasks',
          time: '10 minutes ago',
          initials: 'JD'
        },
        {
          id: 2,
          teamMember: 'Jane Smith',
          action: 'joined Project X',
          time: '30 minutes ago',
          initials: 'JS'
        },
        {
          id: 3,
          teamMember: 'Mike Johnson',
          action: 'created 2 tasks',
          time: '1 hour ago',
          initials: 'MJ'
        }
      ];
      setTeamUpdates(updates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchMyTasks();
    fetchSummary();
    fetchRecentActivities();
    
    if (isManager || isAdmin) {
      fetchWorkspaces();
      fetchTeamUpdates();
    }
  }, []);

  // Handle status change
  const handleStatusChange = async (taskId, newStatus, taskPriority) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/tasks/${taskId}`,
        {
          status: newStatus,
          priority: taskPriority
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      await Promise.all([fetchMyTasks(), fetchSummary(), fetchRecentActivities()]);
    } catch (error) {
      console.log(error);
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
      case 'DONE': return 'var(--success)';
      case 'IN_PROGRESS': return 'var(--warning)';
      case 'TODO': return 'var(--info)';
      default: return 'var(--gray-400)';
    }
  };

  // Calculate productivity score
  const calculateProductivity = () => {
    if (!summary || summary.total === 0) return 0;
    return Math.round((summary.completed / summary.total) * 100);
  };

  if (!user) {
    return (
      <div className="dashboard-error">
        <div className="error-state">
          <h3>No user found</h3>
          <p>Please login again to continue</p>
          <button className="btn-primary" onClick={() => navigate('/login')}>
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
            Welcome back, {user.name}
          </h1>
          <div className="user-badges">
            <span className="role-badge">{roleCode}</span>
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
        
        {loading.summary ? (
          <div className="stats-grid loading">
            {[1,2,3,4].map(i => (
              <div key={i} className="stat-card-skeleton" />
            ))}
          </div>
        ) : summary ? (
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

          {loading.tasks ? (
            <div className="tasks-loading">
              {[1,2,3].map(i => (
                <div key={i} className="task-skeleton" />
              ))}
            </div>
          ) : myTasks.length === 0 ? (
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

          {loading.activities ? (
            <div className="activities-loading">
              {[1,2,3].map(i => (
                <div key={i} className="activity-skeleton" />
              ))}
            </div>
          ) : (
            <div className="activities-list">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-content">
                    <p className="activity-message">{activity.message}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Team Updates (for managers/admins) */}
        {(isManager || isAdmin) && (
          <section className="content-card">
            <div className="card-header">
              <h3>Team Updates</h3>
            </div>

            <div className="team-list">
              {teamUpdates.map(update => (
                <div key={update.id} className="team-item">
                  <div className="team-avatar">{update.initials}</div>
                  <div className="team-content">
                    <p className="team-message">
                      <strong>{update.teamMember}</strong> {update.action}
                    </p>
                    <span className="team-time">{update.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
            
            {loading.workspaces ? (
              <div className="workspaces-loading">
                {[1,2,3].map(i => (
                  <div key={i} className="workspace-skeleton" />
                ))}
              </div>
            ) : workspaces.length === 0 ? (
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