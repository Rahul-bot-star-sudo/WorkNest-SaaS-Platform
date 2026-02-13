import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUser, getToken } from "../utils/auth";
import Profile from "../Components/Profile";
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
  const [showWelcome, setShowWelcome] = useState(true);
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
      // Mock data - replace with actual API call
      const activities = [
        {
          id: 1,
          type: 'task_completed',
          message: 'Completed task "Update documentation"',
          time: '5 minutes ago',
          user: user.name,
          icon: '✅'
        },
        {
          id: 2,
          type: 'workspace_joined',
          message: 'Joined workspace "Project Alpha"',
          time: '1 hour ago',
          user: user.name,
          icon: '🏢'
        },
        {
          id: 3,
          type: 'task_created',
          message: 'Created new task "Review PR"',
          time: '3 hours ago',
          user: user.name,
          icon: '📝'
        },
        {
          id: 4,
          type: 'status_changed',
          message: 'Changed task status to IN_PROGRESS',
          time: '5 hours ago',
          user: user.name,
          icon: '⚡'
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
      // Mock data - replace with actual API call
      const updates = [
        {
          id: 1,
          teamMember: 'John Doe',
          action: 'completed 3 tasks',
          time: '10 minutes ago',
          avatar: 'JD'
        },
        {
          id: 2,
          teamMember: 'Jane Smith',
          action: 'joined Project X',
          time: '30 minutes ago',
          avatar: 'JS'
        },
        {
          id: 3,
          teamMember: 'Mike Johnson',
          action: 'created 2 tasks',
          time: '1 hour ago',
          avatar: 'MJ'
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

    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
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
      <div className="dashboard-container">
        <div className="empty-state">
          <div className="empty-state-icon">👤</div>
          <h3>No user found</h3>
          <p>Please login again to continue</p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Toast */}
      {showWelcome && (
        <div className="welcome-toast">
          👋 Welcome back, {user.name}! You have {summary?.overdue || 0} overdue tasks.
        </div>
      )}

      <Profile
        name={user.name}
        roleCode={roleCode}
        priority={priority}
      />

      <div className="dashboard-main">
        {/* Header Section */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Welcome back, {user.name}! 👋
            </h1>
            <div className="dashboard-role">
              <span className="role-badge">{roleCode}</span>
              {priority && (
                <span className="priority-badge">
                  Priority {priority}
                </span>
              )}
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="time-range-selector">
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

        {/* Analytics Summary Section */}
        <div className="dashboard-panel analytics-panel">
          <div className="panel-header">
            <h2>📊 Analytics Dashboard</h2>
            <div className="productivity-score">
              <span>Productivity Score</span>
              <span className="score-value">{calculateProductivity()}%</span>
            </div>
          </div>
          
          {loading.summary ? (
            <div className="analytics-grid">
              {[1,2,3,4].map(i => (
                <div key={i} className="analytics-card loading">
                  <div className="loading-skeleton"></div>
                </div>
              ))}
            </div>
          ) : summary ? (
            <>
              <div className="analytics-grid">
                <div className="analytics-card total">
                  <div className="card-icon">📋</div>
                  <div className="card-content">
                    <div className="value">{summary.total || 0}</div>
                    <div className="label">Total Tasks</div>
                  </div>
                </div>
                <div className="analytics-card completed">
                  <div className="card-icon">✅</div>
                  <div className="card-content">
                    <div className="value">{summary.completed || 0}</div>
                    <div className="label">Completed</div>
                  </div>
                </div>
                <div className="analytics-card in-progress">
                  <div className="card-icon">⚡</div>
                  <div className="card-content">
                    <div className="value">{summary.in_progress || 0}</div>
                    <div className="label">In Progress</div>
                  </div>
                </div>
                <div className="analytics-card overdue">
                  <div className="card-icon">⚠️</div>
                  <div className="card-content">
                    <div className="value">{summary.overdue || 0}</div>
                    <div className="label">Overdue</div>
                  </div>
                </div>
              </div>

              {summary.total > 0 && (
                <div className="progress-container">
                  <div className="progress-label">
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
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* My Tasks Section */}
          <div className="dashboard-panel tasks-panel">
            <div className="panel-header">
              <h2>📋 My Tasks</h2>
              <button 
                className="view-all-btn"
                onClick={() => navigate('/dashboard/tasks')}
              >
                View All →
              </button>
            </div>

            {loading.tasks ? (
              <div className="tasks-loading">
                {[1,2,3].map(i => (
                  <div key={i} className="task-card loading">
                    <div className="loading-skeleton"></div>
                  </div>
                ))}
              </div>
            ) : myTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <h4>No tasks assigned</h4>
                <p>Take a break or create a new task</p>
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
                      className={`task-card ${isOverdue ? 'overdue' : ''}`}
                      onClick={() => navigate(`/task/${task.id}`)}
                    >
                      <div className="task-header">
                        <div className="task-title">
                          <span 
                            className="status-dot" 
                            style={{ backgroundColor: getStatusColor(task.status) }}
                          />
                          {task.title}
                          {isOverdue && <span className="overdue-badge">⚠️</span>}
                        </div>
                        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <div className="task-project">
                        📁 {task.project_name || "No Project"}
                      </div>
                      
                      <div className="task-footer">
                        {task.due_date && (
                          <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                            📅 {new Date(task.due_date).toLocaleDateString()}
                            {!isOverdue && task.status !== "DONE" && (
                              <span className="days-left">
                                {Math.ceil((new Date(task.due_date) - new Date()) / (1000 * 60 * 60 * 24))}d left
                              </span>
                            )}
                          </span>
                        )}

                        <select
                          className="status-select"
                          value={task.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleStatusChange(task.id, e.target.value, task.priority)}
                        >
                          <option value="TODO">📝 To Do</option>
                          <option value="IN_PROGRESS">⚡ In Progress</option>
                          <option value="DONE">✅ Done</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Deadlines Section */}
          <div className="dashboard-panel deadlines-panel">
            <div className="panel-header">
              <h2>⏰ Upcoming Deadlines</h2>
              <span className="badge">{upcomingDeadlines.length}</span>
            </div>

            {upcomingDeadlines.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🎉</div>
                <h4>No upcoming deadlines</h4>
                <p>You're all caught up!</p>
              </div>
            ) : (
              <div className="deadlines-list">
                {upcomingDeadlines.map(task => (
                  <div 
                    key={task.id} 
                    className="deadline-item"
                    onClick={() => navigate(`/task/${task.id}`)}
                  >
                    <div className="deadline-info">
                      <div className="deadline-title">{task.title}</div>
                      <div className="deadline-project">{task.project_name}</div>
                    </div>
                    <div className={`deadline-badge ${task.daysLeft <= 2 ? 'urgent' : ''}`}>
                      {task.daysLeft === 0 ? 'Today' : 
                       task.daysLeft === 1 ? 'Tomorrow' : 
                       `${task.daysLeft} days`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity Section */}
          <div className="dashboard-panel activity-panel">
            <div className="panel-header">
              <h2>🔄 Recent Activity</h2>
            </div>

            {loading.activities ? (
              <div className="activity-loading">
                {[1,2,3].map(i => (
                  <div key={i} className="activity-item loading">
                    <div className="loading-skeleton"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="activity-list">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <div className="activity-message">{activity.message}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Team Updates (for managers/admins) */}
          {(isManager || isAdmin) && (
            <div className="dashboard-panel team-panel">
              <div className="panel-header">
                <h2>👥 Team Updates</h2>
              </div>

              <div className="team-list">
                {teamUpdates.map(update => (
                  <div key={update.id} className="team-item">
                    <div className="team-avatar">{update.avatar}</div>
                    <div className="team-content">
                      <div className="team-message">
                        <strong>{update.teamMember}</strong> {update.action}
                      </div>
                      <div className="team-time">{update.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workspaces Section */}
          {(isManager || isAdmin) && (
            <div className="dashboard-panel workspaces-panel">
              <div className="panel-header">
                <h2>🏢 My Workspaces</h2>
                <button 
                  className="create-btn"
                  onClick={() => navigate('/dashboard/workspaces/create')}
                >
                  + New
                </button>
              </div>
              
              {loading.workspaces ? (
                <div className="workspaces-loading">
                  {[1,2,3].map(i => (
                    <div key={i} className="workspace-card loading">
                      <div className="loading-skeleton"></div>
                    </div>
                  ))}
                </div>
              ) : workspaces.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🏗️</div>
                  <h4>No workspaces assigned</h4>
                  <button onClick={() => navigate('/dashboard/workspaces/create')}>
                    Create Workspace
                  </button>
                </div>
              ) : (
                <div className="workspace-grid">
                  {workspaces.slice(0, 4).map((ws) => (
                    <div
                      key={ws.id}
                      className="workspace-card"
                      onClick={() => navigate(`/workspace/${ws.id}`)}
                    >
                      <div className="workspace-header">
                        <div className="workspace-icon">🏢</div>
                        <div className="workspace-name">{ws.name}</div>
                      </div>
                      <div className="workspace-stats">
                        <div className="stat">
                          <span className="stat-value">{ws.member_count || 0}</span>
                          <span className="stat-label">members</span>
                        </div>
                        <div className="stat">
                          <span className="stat-value">{ws.project_count || 0}</span>
                          <span className="stat-label">projects</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {count > 3 && (
                <div className="view-more">
                  <button onClick={() => navigate('/dashboard/workspaces')}>
                    View all {count} workspaces →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions Floating Panel */}
        <div className="quick-actions">
          <button 
            className="quick-action-btn" 
            data-tooltip="Create Task"
            onClick={() => navigate('/dashboard/tasks/create')}
          >
            ➕
          </button>
          <button 
            className="quick-action-btn" 
            data-tooltip="Create Workspace"
            onClick={() => navigate('/dashboard/workspaces/create')}
          >
            🏢
          </button>
          <button 
            className="quick-action-btn" 
            data-tooltip="Invite Member"
            onClick={() => navigate('/dashboard/invite')}
          >
            👥
          </button>
          <button 
            className="quick-action-btn" 
            data-tooltip="View Reports"
            onClick={() => navigate('/dashboard/reports')}
          >
            📊
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;