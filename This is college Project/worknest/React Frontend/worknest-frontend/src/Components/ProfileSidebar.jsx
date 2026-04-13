// ProfileSidebar.jsx - Fixed version
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSidebar.css";

function ProfileSidebar({ isCollapsed, onItemClick }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roleCode, setRoleCode] = useState(null);

  // ✅ Load user data dynamically
  useEffect(() => {
    const loadUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setRoleCode(parsedUser?.role?.role_code);
      }
    };
    
    loadUser();
  }, []); // Reload when component mounts

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const menuItems = [
    { icon: "📊", label: "Dashboard", path: "/dashboard" },
    { icon: "👥", label: "Users", path: "/dashboard/users", roles: ["SUPER_ADMIN", "ADMIN"] },
    { icon: "🏢", label: "Workspaces", path: "/dashboard/workspaces", roles: ["SUPER_ADMIN", "ADMIN"] },
    { icon: "🏭", label: "Companies", path: "/dashboard/companies", roles: ["SUPER_ADMIN"] },
    { icon: "⚙️", label: "Settings", path: "/dashboard/settings" },
    { icon: "❓", label: "Help", path: "/dashboard/help" },
  ];

  const filteredMenu = menuItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(roleCode);
  });

  // ✅ Fixed logout function
  const handleLogout = () => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies if any
    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Navigate to login with hard reload
    window.location.href = "/login";
  };

  const handleNavigation = (path) => {
    onItemClick?.();
    navigate(path);
  };

  return (
    <div className="profile-sidebar-wrapper">
      {/* Profile Header */}
      <div className="profile-header-section">
        <div className="profile-avatar-large">
          <div className="profile-avatar-circle">
            {getInitials(user?.name)}
          </div>
          {!isCollapsed && (
            <div className="profile-details">
              <div className="profile-display-name">{user?.name || "User"}</div>
              <div className="profile-display-email">{user?.email || "user@example.com"}</div>
              <div className="profile-role-badge">{roleCode || "EMPLOYEE"}</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="nav-menu-section">
        {filteredMenu.map((item) => (
          <div key={item.path} className="nav-item-custom">
            <button
              className="nav-link-custom"
              onClick={() => handleNavigation(item.path)}
            >
              <span className="nav-icon-custom">{item.icon}</span>
              {!isCollapsed && <span className="nav-label-custom">{item.label}</span>}
            </button>
          </div>
        ))}
      </div>

      {/* Footer with Logout */}
      <div className="profile-footer-section">
        <button className="logout-btn-custom" onClick={handleLogout}>
          <span className="logout-icon">🚪</span>
          {!isCollapsed && <span className="logout-text">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default ProfileSidebar;