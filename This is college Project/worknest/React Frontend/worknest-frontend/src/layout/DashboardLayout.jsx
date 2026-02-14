import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import ProfileSidebar from "../Components/ProfileSidebar";
import "./styles/DashboardLayout.css";

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications] = useState(3);
  const [isProfileOpen, setIsProfileOpen] = useState(true); // For mobile toggle

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Hide welcome toast after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading bar on route change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Generate breadcrumb
  const generateBreadcrumb = () => {
    const paths = location.pathname.split('/').filter(path => path);
    const breadcrumbs = [];

    paths.forEach((path, index) => {
      const url = `/${paths.slice(0, index + 1).join('/')}`;
      const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      
      breadcrumbs.push(
        <span key={url} className="breadcrumb-wrapper">
          {index > 0 && <span className="breadcrumb-separator">›</span>}
          <a
            href={url}
            className={`breadcrumb-item ${index === paths.length - 1 ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(url);
            }}
          >
            {name}
          </a>
        </span>
      );
    });

    return breadcrumbs.length > 0 ? breadcrumbs : (
      <span className="breadcrumb-item active">Dashboard</span>
    );
  };

  return (
    <div className="dashboard-layout">
      {/* Loading Bar */}
      <div className={`loading-bar ${!isLoading ? 'hidden' : ''}`} />

      {/* Offline Indicator */}
      {!isOnline && (
        <div className="offline-indicator">
          ⚠️ You are offline. Some features may be unavailable.
        </div>
      )}

      {/* Welcome Toast */}
      {showWelcome && isOnline && (
        <div className="welcome-toast">
          👋 Welcome back! Ready to manage your workspace?
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Mobile Profile Toggle */}
      <button 
        className="mobile-profile-toggle"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        {isProfileOpen ? '📋' : '👤'}
      </button>

      {/* Main Content with Sidebar Layout */}
      <div className="dashboard-layout-main">
        {/* Profile Sidebar - Left Column */}
        <div className={`profile-sidebar-wrapper ${isProfileOpen ? 'open' : ''}`}>
          <ProfileSidebar />
        </div>

        {/* Main Content - Right Column */}
        <div className="main-content-wrapper">
          {/* Breadcrumb Navigation */}
          <div className="breadcrumb">
            <a
              href="/"
              className="breadcrumb-item"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              🏠 Home
            </a>
            {generateBreadcrumb()}
          </div>

          {/* Content Area */}
          <div className="dashboard-content">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Quick Actions Floating Panel */}
      <div className="quick-actions">
        <button 
          className="quick-action-btn" 
          data-tooltip="Create New Task"
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
          data-tooltip="Notifications"
          onClick={() => navigate('/dashboard/notifications')}
        >
          🔔
          {notifications > 0 && (
            <span className="notification-badge" data-count={notifications} />
          )}
        </button>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-top ${!showScrollTop ? 'hidden' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      />

      
    </div>
  );
}

export default DashboardLayout;