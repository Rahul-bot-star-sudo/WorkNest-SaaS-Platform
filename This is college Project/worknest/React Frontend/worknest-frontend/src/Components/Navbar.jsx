import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [user, setUser] = useState(null);
  const [roleCode, setRoleCode] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("");

  // Load user data
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
        setRoleCode(userData?.role?.role_code);
      } catch (error) {
        setUser(null);
        setRoleCode(null);
      }
    };
    loadUserData();
  }, [location.pathname]);

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== "") {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const isAdmin = ["SUPER_ADMIN", "ADMIN"].includes(roleCode);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-btn')) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileMenu]);

  // ✅ FIXED: Working navigation function
  const goTo = (path) => {
    console.log("Navigating to:", path);
    navigate(path);
    setShowMobileMenu(false);
    setShowProfileDropdown(false);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2);
  };

  // ✅ Working logout function
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    if (theme === "") {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme);
    setShowProfileDropdown(false);
  };

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  const searchResults = [
    { id: 1, name: "Dashboard", path: "/dashboard", icon: "📊", category: "Main" },
    { id: 2, name: "Users", path: "/dashboard/users", icon: "👥", category: "Management" },
    { id: 3, name: "Workspaces", path: "/dashboard/workspaces", icon: "🏢", category: "Management" },
    { id: 4, name: "Create Company", path: "/dashboard/create-company", icon: "🏭", category: "Actions" },
    { id: 5, name: "Companies", path: "/dashboard/companies", icon: "📋", category: "Management" },
    { id: 6, name: "Create User", path: "/dashboard/create-user", icon: "➕", category: "Actions" },
    { id: 7, name: "Create Workspace", path: "/dashboard/workspaces/create", icon: "➕", category: "Actions" },
    { id: 8, name: "My Profile", path: "/dashboard/profile", icon: "👤", category: "Account" },
    { id: 9, name: "Settings", path: "/dashboard/settings", icon: "⚙️", category: "Account" },
    { id: 10, name: "Help & Support", path: "/dashboard/help", icon: "❓", category: "Support" },
  ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊", show: true },
    { path: "/dashboard/create-company", label: "Create Company", icon: "🏭", show: roleCode === "SUPER_ADMIN" },
    { path: "/dashboard/companies", label: "Companies", icon: "📋", show: roleCode === "SUPER_ADMIN" },
    { path: "/dashboard/create-user", label: "Register User", icon: "➕", show: isAdmin },
    { path: "/dashboard/users", label: "Users", icon: "👥", show: isAdmin },
    { path: "/dashboard/workspaces", label: "Workspaces", icon: "🏢", show: isAdmin },
    { path: "/dashboard/workspaces/create", label: "Create Workspace", icon: "➕", show: isAdmin }
  ];

  // Don't render navbar if on login page
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section */}
        <div className="nav-left">
          <div className="navbar-brand" onClick={() => goTo("/dashboard")}>
            <div className="brand-logo">WN</div>
            <span className="brand-text">WorkNest</span>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span className="menu-icon">{showMobileMenu ? "✕" : "☰"}</span>
          </button>

          <div className={`nav-links ${showMobileMenu ? "show" : ""}`} ref={mobileMenuRef}>
            {navItems.map((item) => item.show && (
              <div key={item.path} className="nav-item">
                <button onClick={() => goTo(item.path)} className={`nav-link ${isActive(item.path) ? "active" : ""}`}>
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
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
                  [...new Set(searchResults.map(r => r.category))].map(category => (
                    <div key={category}>
                      <div className="search-category">{category}</div>
                      {searchResults.filter(r => r.category === category).map(result => (
                        <div key={result.id} className="search-result-item" onClick={() => {
                          goTo(result.path);
                          setSearchQuery("");
                          setShowSearchResults(false);
                        }}>
                          <span className="result-icon">{result.icon}</span>
                          <span className="result-name">{result.name}</span>
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="search-result-item no-result">No results found for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <div className="notification-bell" onClick={handleNotificationClick}>
            <span className="bell-icon">🔔</span>
            {notifications > 0 && <span className="notification-badge">{notifications}</span>}
          </div>

          {/* Theme Selector */}
          <select onChange={(e) => changeTheme(e.target.value)} className="theme-selector" value={currentTheme}>
            <optgroup label="🎯 VS CODE THEMES">
              <option value="vscode">💻 VS Code Dark</option>
              <option value="vscode-plus">⚡ VS Code Dark+</option>
              <option value="vscode-light">☀️ VS Code Light</option>
              <option value="vscode-blue">🔵 VS Code Blue</option>
            </optgroup>
            <optgroup label="🏆 PROFESSIONAL THEMES">
              <option value="">🎨 Default Blue</option>
              <option value="zenith">⭐ Zenith Pro Light</option>
              <option value="zenith-dark">🌙 Zenith Pro Dark</option>
              <option value="tailwind">🎨 Tailwind Pro</option>
              <option value="github">🐙 GitHub Dark</option>
            </optgroup>
            <optgroup label="🌙 DARK THEMES">
              <option value="dark">🌑 Classic Dark</option>
              <option value="void">💀 Void Energy</option>
              <option value="galaxy">🌌 Midnight Galaxy</option>
              <option value="royal">👑 Royal Purple</option>
            </optgroup>
            <optgroup label="🎨 COLOR THEMES">
              <option value="green">🟢 Green</option>
              <option value="forest">🌲 Forest</option>
              <option value="sage">🌿 Sage</option>
              <option value="ocean">🌊 Ocean</option>
              <option value="peach">🍑 Peach</option>
              <option value="lavender">💜 Lavender</option>
              <option value="golden">🟡 Golden</option>
              <option value="sunset">🌅 Sunset</option>
              <option value="cotton">🎀 Cotton Candy</option>
              <option value="coffee">☕ Coffee</option>
            </optgroup>
            <optgroup label="⚡ FUN THEMES">
              <option value="addicted">💀 Addicted</option>
              <option value="casino">🎰 Casino</option>
              <option value="gamer">🎮 Gamer</option>
              <option value="neon">🚀 Neon</option>
              <option value="disco">🎪 Disco</option>
            </optgroup>
            <optgroup label="🔥 CRAZY THEMES">
              <option value="psychedelic">🌈 Psychedelic</option>
              <option value="hypnotic">👁️ Hypnotic</option>
              <option value="multidim">🎭 Multi Dimension</option>
              <option value="godmode">⚡ God Mode</option>
            </optgroup>
          </select>

          {/* User Profile */}
          {user && (
            <div className="user-profile" onClick={() => setShowProfileDropdown(!showProfileDropdown)} ref={dropdownRef}>
              <div className="user-avatar">{getInitials(user?.name)}</div>
              <div className="user-info">
                <span className="user-name">{user?.name || "User"}</span>
                <span className="user-role">{roleCode || "EMPLOYEE"}</span>
              </div>
              <span className="dropdown-arrow">▼</span>
            </div>
          )}

          {/* Profile Dropdown */}
          {showProfileDropdown && user && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-avatar">{getInitials(user?.name)}</div>
                <div className="dropdown-user-info">
                  <h4>{user?.name || "User"}</h4>
                  <p>{user?.email || "email@example.com"}</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => goTo("/dashboard/profile")}>
                  <span className="dropdown-icon">👤</span>
                  <span>My Profile</span>
                </div>
                <div className="dropdown-item" onClick={() => goTo("/dashboard/settings")}>
                  <span className="dropdown-icon">⚙️</span>
                  <span>Settings</span>
                </div>
                <div className="dropdown-item" onClick={() => goTo("/dashboard/activity")}>
                  <span className="dropdown-icon">📊</span>
                  <span>Activity Log</span>
                </div>
                <div className="dropdown-item" onClick={() => goTo("/dashboard/help")}>
                  <span className="dropdown-icon">❓</span>
                  <span>Help & Support</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout" onClick={handleLogout}>
                  <span className="dropdown-icon">🚪</span>
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && <div className="mobile-overlay" onClick={() => setShowMobileMenu(false)}></div>}
    </nav>
  );
}

export default Navbar;