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
  const [isLoading, setIsLoading] = useState(false);
  
  // Better sidebar state management
  const [sidebarState, setSidebarState] = useState({
    isOpen: true,
    isMobile: window.innerWidth <= 768,
    isHovered: false
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setSidebarState(prev => ({
        ...prev,
        isMobile,
        // Auto-close on mobile, open on desktop
        isOpen: isMobile ? false : true
      }));
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Show loading bar on route change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (sidebarState.isMobile) {
      setSidebarState(prev => ({ ...prev, isOpen: false }));
    }
  }, [location, sidebarState.isMobile]);

  const toggleSidebar = () => {
    setSidebarState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const handleSidebarHover = (isHovered) => {
    if (sidebarState.isMobile) return; // No hover on mobile
    setSidebarState(prev => ({ ...prev, isHovered }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate breadcrumb
  const generateBreadcrumb = () => {
    const paths = location.pathname.split('/').filter(path => path);
    
    if (paths.length === 0) {
      return <span className="breadcrumb-active">Dashboard</span>;
    }

    return paths.map((path, index) => {
      const url = `/${paths.slice(0, index + 1).join('/')}`;
      const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      const isLast = index === paths.length - 1;

      return (
        <span key={url} className="breadcrumb-item-wrapper">
          {index > 0 && <span className="breadcrumb-separator">/</span>}
          {isLast ? (
            <span className="breadcrumb-active">{name}</span>
          ) : (
            <button
              className="breadcrumb-link"
              onClick={() => navigate(url)}
            >
              {name}
            </button>
          )}
        </span>
      );
    });
  };

  // Determine sidebar class based on state
  const getSidebarClass = () => {
    if (sidebarState.isMobile) {
      return sidebarState.isOpen ? 'mobile-open' : 'mobile-closed';
    }
    return sidebarState.isOpen ? 'desktop-open' : 'desktop-closed';
  };

  return (
    <div className="app-container">
      {/* Loading Bar */}
      <div className={`loading-bar ${isLoading ? 'active' : ''}`} />

      {/* Offline Banner */}
      {!isOnline && (
        <div className="offline-banner">
          <span className="offline-icon">●</span>
          You're offline. Connecting...
          <button className="offline-retry" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Mobile Sidebar Toggle */}
      {sidebarState.isMobile && (
        <button 
          className={`sidebar-toggle ${sidebarState.isOpen ? 'active' : ''}`}
          onClick={toggleSidebar}
          aria-label={sidebarState.isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <span className="toggle-icon">
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
          </span>
        </button>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {sidebarState.isMobile && sidebarState.isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      {/* Main Layout */}
      <div className={`main-layout`}>
        {/* Sidebar - 25% width */}
        <aside 
          className={`sidebar ${getSidebarClass()} ${sidebarState.isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => handleSidebarHover(true)}
          onMouseLeave={() => handleSidebarHover(false)}
        >
          <ProfileSidebar 
            isCollapsed={!sidebarState.isOpen && !sidebarState.isHovered}
            onItemClick={() => {
              // Close sidebar on mobile when an item is clicked
              if (sidebarState.isMobile) {
                setSidebarState(prev => ({ ...prev, isOpen: false }));
              }
            }}
          />
        </aside>

        {/* Content Area - 75% width */}
        <main className={`content-area ${!sidebarState.isOpen && !sidebarState.isMobile ? 'expanded' : ''}`}>
          
          {/* Breadcrumb */}
          <div className="breadcrumb-container">
            <div className="breadcrumb-left">
              <button
                className="breadcrumb-home"
                onClick={() => navigate('/')}
              >
                <span className="home-icon">🏠</span>
                Home
              </button>
              {generateBreadcrumb()}
            </div>
            <div className="breadcrumb-right">
              <button 
                className="breadcrumb-refresh"
                onClick={() => window.location.reload()}
                aria-label="Refresh"
              >
                ↻
              </button>
            </div>
          </div>

          {/* Page Content */}
          <div className="page-content">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-panel">
        <button 
          className="quick-action"
          onClick={() => navigate('/dashboard/tasks/create')}
          title="New Task"
        >
          <span className="quick-action-icon">+</span>
        </button>
        <button 
          className="quick-action"
          onClick={() => navigate('/dashboard/workspaces/create')}
          title="New Workspace"
        >
          <span className="quick-action-icon">⊕</span>
        </button>
        <button 
          className="quick-action"
          onClick={() => navigate('/dashboard/invite')}
          title="Invite Member"
        >
          <span className="quick-action-icon">👥</span>
        </button>
      </div>

      {/* Scroll to Top */}
      <button 
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}

export default DashboardLayout;