import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./styles/Navbar.css";

console.log("Navbar Rendered");

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [notifications] = useState(3); // Example notification count
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const roleCode = user?.role?.role_code;

  const isAdmin = ["SUPER_ADMIN", "ADMIN"].includes(roleCode);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goTo = (path) => {
    navigate(path);
    setShowMobileMenu(false);
    setShowProfileDropdown(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Mock search function
  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const searchResults = [
    { id: 1, name: "Dashboard", path: "/dashboard", icon: "📊" },
    { id: 2, name: "Users", path: "/dashboard/users", icon: "👥" },
    { id: 3, name: "Workspaces", path: "/dashboard/workspaces", icon: "🏢" },
  ].filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: "📊",
      show: true
    },
    {
      path: "/dashboard/create-user",
      label: "Register User",
      icon: "➕",
      show: isAdmin
    },
    {
      path: "/dashboard/users",
      label: "Users",
      icon: "👥",
      show: isAdmin
    },
    {
      path: "/dashboard/workspaces",
      label: "Workspaces",
      icon: "🏢",
      show: isAdmin
    },
    {
      path: "/dashboard/workspaces/create",
      label: "Create Workspace",
      icon: "➕",
      show: isAdmin
    }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section - Logo and Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="navbar-brand" onClick={() => goTo("/dashboard")}>
            <div className="brand-logo"></div>
            <span className="brand-text">WorkNest</span>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? "✕" : "☰"}
          </button>

          {/* Navigation Links */}
          <div className={`nav-links ${showMobileMenu ? "show" : ""}`}>
            {navItems.map(
              (item) =>
                item.show && (
                  <div key={item.path} className="nav-item">
                    <button
                      onClick={() => goTo(item.path)}
                      className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {item.label}
                    </button>
                  </div>
                )
            )}
          </div>
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="nav-right">
          {/* Search Bar */}
          <div className="nav-search" ref={searchRef}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowSearchResults(true)}
            />
            {showSearchResults && searchQuery && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map(result => (
                    <div
                      key={result.id}
                      className="search-result-item"
                      onClick={() => {
                        goTo(result.path);
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                    >
                      <span style={{ marginRight: "0.5rem" }}>{result.icon}</span>
                      {result.name}
                    </div>
                  ))
                ) : (
                  <div className="search-result-item">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <div className="notification-bell">
            🔔
            {notifications > 0 && (
              <span className="notification-badge">{notifications}</span>
            )}
          </div>

          {/* User Profile */}
          <div 
            className="user-profile"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            ref={dropdownRef}
          >
            <div className="user-avatar">
              {getInitials(user?.name)}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name || "User"}</span>
              <span className="user-role">{roleCode || "EMPLOYEE"}</span>
            </div>
          </div>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <h4>{user?.name || "User"}</h4>
                <p>{user?.email || "email@example.com"}</p>
              </div>
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => goTo("/dashboard/profile")}>
                  👤 My Profile
                </div>
                <div className="dropdown-item" onClick={() => goTo("/dashboard/settings")}>
                  ⚙️ Settings
                </div>
                <div className="dropdown-item" onClick={() => goTo("/dashboard/activity")}>
                  📊 Activity Log
                </div>
                <div className="dropdown-item" onClick={() => goTo("/dashboard/help")}>
                  ❓ Help & Support
                </div>
                <div className="dropdown-item logout" onClick={handleLogout}>
                  🚪 Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;