import { useEffect, useState, useRef } from "react";
import { createWorkspace, getWorkspaceTypes } from "../services/workspaceApi";
import { getUsersApi } from "../services/user.api";
import "./styles/createWorkspace.css";

function CreateWorkspacePage() {
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState("");
  const [types, setTypes] = useState([]);
  const [managerId, setManagerId] = useState("");
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingManagers, setLoadingManagers] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [success, setSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const cardRef = useRef(null);
  const buttonRef = useRef(null);

  // 🔹 Load workspace types
  useEffect(() => {
    const loadTypes = async () => {
      setLoadingTypes(true);
      try {
        const res = await getWorkspaceTypes();
        setTypes(res.data.data || []);
      } catch (error) {
        console.error("Error loading types:", error);
        showNotification("Failed to load workspace types", "error");
      } finally {
        setLoadingTypes(false);
      }
    };

    loadTypes();
  }, []);

  // 🔹 Load managers (role = MANAGER)
  useEffect(() => {
    const loadManagers = async () => {
      setLoadingManagers(true);
      try {
        const data = await getUsersApi("MANAGER", "");
        setManagers(data || []);
      } catch (error) {
        console.error("Error loading managers:", error);
        showNotification("Failed to load managers", "error");
      } finally {
        setLoadingManagers(false);
      }
    };

    loadManagers();
  }, []);

  // Mouse move effect for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update CSS variables for interactive effects
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty('--x', `${x}%`);
        cardRef.current.style.setProperty('--y', `${y}%`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !typeId || !managerId) {
      setError("Please fill all fields");
      showNotification("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await createWorkspace({
        name,
        typeId,
        manager_id: managerId
      });

      setSuccess(true);
      showNotification("Workspace Created Successfully!", "success");

      setName("");
      setTypeId("");
      setManagerId("");

      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setError(message);
      showNotification(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Magnetic effect for button
  const handleButtonMouseMove = (e) => {
    if (!buttonRef.current || loading) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = (x - centerX) * 0.1;
    const moveY = (y - centerY) * 0.1;
    
    buttonRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleButtonMouseLeave = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = 'translate(0, 0)';
  };

  return (
    <div className="workspace-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="mesh-grid"></div>
      </div>

      <div className="container">
        <div className="workspace-card glass-morphism" ref={cardRef}>
          {/* Decorative Elements */}
          <div className="card-shine"></div>
          <div className="floating-elements">
            <span></span><span></span><span></span><span></span><span></span>
          </div>

          {/* Success Animation */}
          {success && (
            <div className="success-animation">
              <div className="checkmark-circle">
                <div className="checkmark-stem"></div>
                <div className="checkmark-kick"></div>
              </div>
            </div>
          )}

          <div className="workspace-header">
            <div className="icon-container">
              <svg className="workspace-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="4" ry="4" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="22" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="22" strokeWidth="2"/>
                <line x1="2" y1="8" x2="22" y2="8" strokeWidth="2"/>
                <line x1="2" y1="16" x2="22" y2="16" strokeWidth="2"/>
              </svg>
              <div className="icon-pulse"></div>
            </div>
            <h2 className="workspace-title">Create Workspace</h2>
            <p className="workspace-subtitle">
              Setup a new workspace in your organization
            </p>
          </div>

          <form className="workspace-form" onSubmit={handleSubmit}>
            
            {/* Workspace Name */}
            <div className={`form-group magnetic-field ${focusedField === 'name' ? 'focused' : ''}`}>
              <label className="floating-label">
                <span className="label-text">Workspace Name</span>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 7h-4.5L15 4h-6L8.5 7H4v11h16V7z" strokeWidth="2"/>
                    <circle cx="12" cy="13" r="3" strokeWidth="2"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter workspace name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className="magnetic-input"
                    autoComplete="off"
                    maxLength={50}
                  />
                  {name && <span className="input-char-count">{name.length}/50</span>}
                  <div className="input-glow"></div>
                </div>
              </label>
            </div>

            {/* Workspace Type */}
            <div className={`form-group magnetic-field ${focusedField === 'type' ? 'focused' : ''}`}>
              <label className="floating-label">
                <span className="label-text">Workspace Type</span>
                <div className="input-wrapper select-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                    <line x1="3" y1="9" x2="21" y2="9" strokeWidth="2"/>
                    <line x1="9" y1="21" x2="9" y2="9" strokeWidth="2"/>
                  </svg>
                  <select
                    value={typeId}
                    onChange={(e) => setTypeId(e.target.value)}
                    onFocus={() => handleFocus('type')}
                    onBlur={handleBlur}
                    className="magnetic-select"
                    disabled={loadingTypes}
                  >
                    <option value="">Select Workspace Type</option>
                    {types.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  {loadingTypes && (
                    <div className="select-loader">
                      <div className="loader-dot"></div>
                      <div className="loader-dot"></div>
                      <div className="loader-dot"></div>
                    </div>
                  )}
                  <div className="select-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="6 9 12 15 18 9" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </label>
            </div>

            {/* Manager Dropdown */}
            <div className={`form-group magnetic-field ${focusedField === 'manager' ? 'focused' : ''}`}>
              <label className="floating-label">
                <span className="label-text">Select Manager</span>
                <div className="input-wrapper select-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2"/>
                    <circle cx="12" cy="7" r="4" strokeWidth="2"/>
                    <path d="M16 7l2 2 4-4" strokeWidth="2"/>
                  </svg>
                  <select
                    value={managerId}
                    onChange={(e) => setManagerId(e.target.value)}
                    onFocus={() => handleFocus('manager')}
                    onBlur={handleBlur}
                    className="magnetic-select"
                    disabled={loadingManagers}
                  >
                    <option value="">Select Manager</option>
                    {managers.map((manager) => (
                      <option key={manager.id} value={manager.id}>
                        {manager.name} {manager.email && `(${manager.email})`}
                      </option>
                    ))}
                  </select>
                  {loadingManagers && (
                    <div className="select-loader">
                      <div className="loader-dot"></div>
                      <div className="loader-dot"></div>
                      <div className="loader-dot"></div>
                    </div>
                  )}
                  <div className="select-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="6 9 12 15 18 9" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`btn-primary magnetic-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
              ref={buttonRef}
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
            >
              <span className="btn-content">
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Creating Workspace...</span>
                  </>
                ) : (
                  <>
                    <span>Create Workspace</span>
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2"/>
                    </svg>
                  </>
                )}
              </span>
              <div className="btn-glow"></div>
              <div className="btn-ripple"></div>
            </button>

          </form>

          {/* Progress Summary */}
          <div className="progress-summary">
            <div className={`progress-item ${name ? 'completed' : ''}`}>
              <span className="progress-dot"></span>
              <span className="progress-text">Workspace Name</span>
            </div>
            <div className={`progress-item ${typeId ? 'completed' : ''}`}>
              <span className="progress-dot"></span>
              <span className="progress-text">Workspace Type</span>
            </div>
            <div className={`progress-item ${managerId ? 'completed' : ''}`}>
              <span className="progress-dot"></span>
              <span className="progress-text">Manager</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspacePage;