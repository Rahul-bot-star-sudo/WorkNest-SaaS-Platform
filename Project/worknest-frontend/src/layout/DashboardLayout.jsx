import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../Components/Navbar";
import ProfileSidebar from "../Components/ProfileSidebar";
import "./styles/DashboardLayout.css";

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  
  // Refs for performance
  const scrollTimeoutRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  
  // Better sidebar state management
  const [sidebarState, setSidebarState] = useState({
    isOpen: window.innerWidth > 768,
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth <= 1024 && window.innerWidth > 768,
    isHovered: false,
    isAnimating: false
  });

  // Handle window resize with debounce
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        
        setSidebarState(prev => ({
          ...prev,
          isMobile,
          isTablet,
          isOpen: isMobile ? false : (isTablet ? false : prev.isOpen),
          isAnimating: true
        }));
        
        // Reset animation flag after transition
        setTimeout(() => {
          setSidebarState(prev => ({ ...prev, isAnimating: false }));
        }, 300);
      }, 150);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Track scroll position with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setShowScrollTop(scrollY > 400);
          setShowQuickActions(scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Optional: Show success message
      setTimeout(() => setIsOnline(true), 3000);
    };
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
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (sidebarState.isMobile && sidebarState.isOpen) {
      setSidebarState(prev => ({ ...prev, isOpen: false }));
    }
  }, [location.pathname]);

  const toggleSidebar = useCallback(() => {
    if (sidebarState.isAnimating) return;
    
    setSidebarState(prev => ({ 
      ...prev, 
      isOpen: !prev.isOpen,
      isAnimating: true
    }));
    
    setTimeout(() => {
      setSidebarState(prev => ({ ...prev, isAnimating: false }));
    }, 300);
  }, [sidebarState.isAnimating]);

  const handleSidebarHover = useCallback((isHovered) => {
    if (sidebarState.isMobile || sidebarState.isTablet || sidebarState.isAnimating) return;
    setSidebarState(prev => ({ ...prev, isHovered }));
  }, [sidebarState.isMobile, sidebarState.isTablet, sidebarState.isAnimating]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Generate breadcrumb with better formatting
  const generateBreadcrumb = useCallback(() => {
    const paths = location.pathname.split('/').filter(path => path && path !== 'dashboard');
    
    if (paths.length === 0) {
      return null;
    }

    let currentPath = '/dashboard';
    
    return paths.map((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === paths.length - 1;
      const name = path
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return (
        <span key={currentPath} className="breadcrumb-item-wrapper">
          <span className="breadcrumb-separator">/</span>
          {isLast ? (
            <span className="breadcrumb-active">{name}</span>
          ) : (
            <button
              className="breadcrumb-link"
              onClick={() => navigate(currentPath)}
            >
              {name}
            </button>
          )}
        </span>
      );
    });
  }, [location.pathname, navigate]);

  // Determine sidebar class based on state
  const getSidebarClass = useCallback(() => {
    if (sidebarState.isMobile) {
      return sidebarState.isOpen ? 'mobile-open' : 'mobile-closed';
    }
    if (sidebarState.isTablet) {
      return sidebarState.isOpen ? 'tablet-open' : 'tablet-closed';
    }
    if (!sidebarState.isOpen && sidebarState.isHovered) {
      return 'desktop-hovered';
    }
    return sidebarState.isOpen ? 'desktop-open' : 'desktop-closed';
  }, [sidebarState]);

  // Get content area class
  const getContentClass = useCallback(() => {
    const classes = ['content-area'];
    const isSidebarCollapsed = !sidebarState.isOpen && !sidebarState.isHovered && !sidebarState.isMobile && !sidebarState.isTablet;
    
    if (isSidebarCollapsed) {
      classes.push('expanded');
    }
    if (sidebarState.isMobile && sidebarState.isOpen) {
      classes.push('blurred');
    }
    if (sidebarState.isAnimating) {
      classes.push('no-transition');
    }
    
    return classes.join(' ');
  }, [sidebarState]);

  const quickActions = [
    { icon: '➕', label: 'Quick Add', path: '/dashboard/quick-add', color: 'primary', shortcut: 'Q' },
    { icon: '📝', label: 'New Task', path: '/dashboard/tasks/create', color: 'success', shortcut: 'T' },
    { icon: '🏢', label: 'New Workspace', path: '/dashboard/workspaces/create', color: 'info', shortcut: 'W' },
    { icon: '👥', label: 'Invite Member', path: '/dashboard/invite', color: 'warning', shortcut: 'I' },
    { icon: '⚡', label: 'AI Assistant', path: '/dashboard/ai-assistant', color: 'galaxy', shortcut: 'A' }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + K to toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSidebar();
      }
      // Escape to close sidebar on mobile
      if (e.key === 'Escape' && sidebarState.isMobile && sidebarState.isOpen) {
        toggleSidebar();
      }
      // Ctrl/Cmd + B to go back
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        navigate(-1);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleSidebar, navigate, sidebarState.isMobile, sidebarState.isOpen]);

  return (
    <div className="dashboard-layout">
      {/* Loading Bar */}
      <div className={`loading-bar ${isLoading ? 'active' : ''}`} />

      {/* Offline Banner */}
      {!isOnline && (
        <div className="offline-banner">
          <span className="offline-icon">⚠️</span>
          <span className="offline-message">You're offline. Some features may be unavailable.</span>
          <button className="offline-retry" onClick={() => window.location.reload()}>
            Retry Connection
          </button>
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Mobile Sidebar Toggle */}
      {sidebarState.isMobile && (
        <button 
          className={`sidebar-toggle-mobile ${sidebarState.isOpen ? 'active' : ''}`}
          onClick={toggleSidebar}
          aria-label={sidebarState.isOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarState.isOpen}
        >
          <span className="toggle-icon">
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
            <span className="toggle-bar"></span>
          </span>
        </button>
      )}

      {/* Tablet Sidebar Toggle */}
      {sidebarState.isTablet && !sidebarState.isOpen && (
        <button 
          className="sidebar-toggle-tablet"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <span className="toggle-icon">☰</span>
        </button>
      )}

      {/* Desktop Sidebar Toggle */}
      {!sidebarState.isMobile && !sidebarState.isTablet && (
        <button 
          className={`sidebar-toggle-desktop ${!sidebarState.isOpen ? 'collapsed' : ''}`}
          onClick={toggleSidebar}
          aria-label={sidebarState.isOpen ? "Collapse sidebar" : "Expand sidebar"}
          title={`${sidebarState.isOpen ? 'Collapse' : 'Expand'} sidebar (Ctrl+K)`}
        >
          <span className="toggle-icon">{sidebarState.isOpen ? '◀' : '▶'}</span>
        </button>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {sidebarState.isMobile && sidebarState.isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar} />
      )}

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside 
          className={`sidebar ${getSidebarClass()}`}
          onMouseEnter={() => handleSidebarHover(true)}
          onMouseLeave={() => handleSidebarHover(false)}
          aria-label="Main navigation sidebar"
        >
          <ProfileSidebar 
            isCollapsed={!sidebarState.isOpen && !sidebarState.isHovered}
            onItemClick={() => {
              if (sidebarState.isMobile) {
                setSidebarState(prev => ({ ...prev, isOpen: false }));
              }
            }}
          />
        </aside>

        {/* Content Area */}
        <main className={getContentClass()}>
          {/* Breadcrumb */}
          {(location.pathname !== '/dashboard' || generateBreadcrumb()) && (
            <div className="breadcrumb-container">
              <div className="breadcrumb-left">
                <button
                  className="breadcrumb-home"
                  onClick={() => navigate('/dashboard')}
                  aria-label="Go to dashboard"
                  title="Dashboard"
                >
                  <span className="home-icon">🏠</span>
                  <span className="home-text">Dashboard</span>
                </button>
                {generateBreadcrumb()}
              </div>
              <div className="breadcrumb-right">
                <button 
                  className="breadcrumb-refresh"
                  onClick={() => window.location.reload()}
                  aria-label="Refresh page"
                  title="Refresh"
                >
                  ↻
                </button>
              </div>
            </div>
          )}

          {/* Page Content */}
          <div className="page-content">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="dashboard-footer">
            <div className="footer-content">
              <p className="footer-copyright">
                © 2024 WorkNest. All rights reserved.
              </p>
              <div className="footer-links">
                <button onClick={() => navigate('/dashboard/help')} className="footer-link">
                  Help
                </button>
                <button onClick={() => navigate('/dashboard/privacy')} className="footer-link">
                  Privacy
                </button>
                <button onClick={() => navigate('/dashboard/terms')} className="footer-link">
                  Terms
                </button>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Quick Actions Panel */}
      {showQuickActions && (
        <div className="quick-actions-panel">
          {quickActions.map((action, index) => (
            <button 
              key={index}
              className={`quick-action ${action.color}`}
              onClick={() => navigate(action.path)}
              title={`${action.label} (${action.shortcut})`}
              aria-label={action.label}
            >
              <span className="quick-action-icon">{action.icon}</span>
              <span className="quick-action-label">{action.label}</span>
              <span className="quick-action-shortcut">{action.shortcut}</span>
            </button>
          ))}
        </div>
      )}

      {/* Scroll to Top */}
      <button 
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <span className="scroll-icon">↑</span>
      </button>
    </div>
  );
}

export default DashboardLayout;