import { getUser, logout } from "../utils/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSidebar.css";

function ProfileSidebar() {
  const [showActivity, setShowActivity] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

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

  // Get priority color
  const getPriorityColor = () => {
    switch(role?.priority) {
      case 'HIGH': return { color: '#ef4444', width: '100%' };
      case 'MEDIUM': return { color: '#f59e0b', width: '66%' };
      case 'LOW': return { color: '#10b981', width: '33%' };
      default: return { color: '#64748b', width: '50%' };
    }
  };

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
        
        <h3 className="profile-title">Profile</h3>
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
            <span className="role-badge">{role?.role_code || 'N/A'}</span>
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
                {role?.priority || 'N/A'}
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
          <div className="stat-value">12</div>
          <div className="stat-label">Tasks</div>
        </div>
        <div className="stat-card" onClick={() => navigate("/dashboard/projects")}>
          <div className="stat-value">3</div>
          <div className="stat-label">Projects</div>
        </div>
        <div className="stat-card" onClick={() => navigate("/dashboard/workspaces")}>
          <div className="stat-value">2</div>
          <div className="stat-label">Workspaces</div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button className="btn-edit" onClick={handleEditProfile}>
        <span className="btn-logout-icon">✏️</span>
        Edit Profile
      </button>

      {/* Activity Timeline */}
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
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <span>✅ Completed task</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <span>🏢 Joined workspace</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-dot"></span>
              <span>📝 Created new task</span>
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