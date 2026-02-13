import { getUser, logout } from "../utils/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSidebar.css";

function ProfileSidebar() {
  const [showActivity, setShowActivity] = useState(false);
  const [userStats, setUserStats] = useState({
    tasks: 12,
    projects: 3,
    workspaces: 2
  });
  const [lastActive, setLastActive] = useState("2 minutes ago");
  
  const user = getUser();
  const navigate = useNavigate();

  if (!user) return null;

  const { name, email, role } = user;

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get priority color and width
  const getPriorityColor = () => {
    switch(role.priority) {
      case 'HIGH': return { color: 'var(--danger)', width: '100%' };
      case 'MEDIUM': return { color: 'var(--warning)', width: '66%' };
      case 'LOW': return { color: 'var(--success)', width: '33%' };
      default: return { color: 'var(--gray-400)', width: '50%' };
    }
  };

  // Activity timeline data
  const activities = [
    { time: "5 min ago", action: "Completed task", icon: "✅" },
    { time: "1 hour ago", action: "Joined new workspace", icon: "🏢" },
    { time: "3 hours ago", action: "Updated profile", icon: "✏️" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/dashboard/profile/edit");
  };

  const priorityStyle = getPriorityColor();

  return (
    <aside className="profile-sidebar">
      {/* Profile Header with Avatar */}
      <div className="profile-header">
        <div className="profile-avatar" onClick={handleEditProfile}>
          <div className="avatar-ring"></div>
          <div className="avatar-image">
            {getInitials(name)}
          </div>
          <div className="avatar-status"></div>
        </div>
        
        <h3 className="profile-title">
          Profile
        </h3>
      </div>

      {/* Profile Info Section */}
      <div className="profile-info">
        <div className="info-item">
          <span className="info-label">
            <span className="info-label-icon">👤</span>
            Name
          </span>
          <span className="info-value">{name}</span>
        </div>

        <div className="info-item">
          <span className="info-label">
            <span className="info-label-icon">📧</span>
            Email
          </span>
          <span className="info-value">{email}</span>
        </div>

        <div className="info-item">
          <span className="info-label">
            <span className="info-label-icon">🎭</span>
            Role
          </span>
          <span className="info-value">
            <span className="role-badge">{role.role_code}</span>
          </span>
        </div>

        <div className="info-item">
          <span className="info-label">
            <span className="info-label-icon">📊</span>
            Priority
          </span>
          <span className="info-value">
            <div className="priority-indicator">
              <span style={{ color: priorityStyle.color, fontWeight: 'bold' }}>
                {role.priority}
              </span>
              <div className="priority-bar">
                <div 
                  className="priority-fill" 
                  style={{ width: priorityStyle.width }}
                />
              </div>
            </div>
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="profile-stats">
        <div className="stat-card" onClick={() => navigate("/dashboard/tasks")}>
          <div className="stat-value">{userStats.tasks}</div>
          <div className="stat-label">Tasks</div>
        </div>
        <div className="stat-card" onClick={() => navigate("/dashboard/projects")}>
          <div className="stat-value">{userStats.projects}</div>
          <div className="stat-label">Projects</div>
        </div>
        <div className="stat-card" onClick={() => navigate("/dashboard/workspaces")}>
          <div className="stat-value">{userStats.workspaces}</div>
          <div className="stat-label">Workspaces</div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button className="btn-edit" onClick={handleEditProfile}>
        <span className="btn-logout-icon">✏️</span>
        Edit Profile
      </button>

      {/* Activity Timeline (Toggle) */}
      <div className="activity-timeline">
        <div 
          className="timeline-title"
          onClick={() => setShowActivity(!showActivity)}
          style={{ cursor: 'pointer' }}
        >
          <span>📋 Recent Activity</span>
          <span style={{ fontSize: '0.8rem' }}>{showActivity ? '▼' : '▶'}</span>
        </div>
        
        {showActivity && (
          <>
            {activities.map((activity, index) => (
              <div key={index} className="timeline-item">
                <span className="timeline-dot"></span>
                <span style={{ minWidth: '60px', color: 'var(--gray-500)' }}>
                  {activity.time}
                </span>
                <span>{activity.icon}</span>
                <span>{activity.action}</span>
              </div>
            ))}
            <div className="timeline-item" style={{ color: 'var(--gray-500)', fontSize: '0.7rem' }}>
              <span className="timeline-dot"></span>
              <span>Last active: {lastActive}</span>
            </div>
          </>
        )}
      </div>

      {/* Logout Button */}
      <button className="btn-logout" onClick={handleLogout}>
        <span className="btn-logout-icon">🚪</span>
        Logout
        <span className="btn-logout-icon">→</span>
      </button>
    </aside>
  );
}

export default ProfileSidebar;