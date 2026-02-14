import { useEffect, useState } from "react";
import { getDropdownRoles } from "../services/roleApi";
import { createUser } from "../services/user.api";
import "./CreateUserPage.css"; // Naya CSS file

function CreateUserPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_code: "",
  });

  useEffect(() => {
    async function fetchRoles() {
      setLoading(true);
      try {
        const result = await getDropdownRoles();
        setRoles(result.data.data || []);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
        // Show toast notification here
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role_code) {
      showNotification("Please select a role", "error");
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      showNotification("Please fill all fields", "error");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser(formData);
      
      if (result.data?.success) {
        showNotification("User created successfully!", "success");
        setFormData({
          name: "",
          email: "",
          password: "",
          role_code: "",
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      showNotification(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const showNotification = (message, type) => {
    // Create custom notification
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

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="create-user-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-sphere"></div>
        <div className="gradient-sphere-2"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="container">
        <div className="auth-card glass-morphism">
          {/* Decorative Elements */}
          <div className="card-glow"></div>
          <div className="card-particles">
            <span></span><span></span><span></span><span></span>
          </div>

          <div className="auth-header">
            <div className="icon-wrapper">
              <svg className="user-plus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeWidth="2"/>
                <circle cx="9" cy="7" r="4" strokeWidth="2"/>
                <path d="M19 8v6M22 11h-6" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="auth-title">Create New User</h2>
            <p className="auth-subtitle">
              Assign a role and create a new team member
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className={`form-group magnetic-field ${focusedField === 'name' ? 'focused' : ''}`}>
              <label className="floating-label">
                <span className="label-text">Full Name</span>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2"/>
                    <circle cx="12" cy="7" r="4" strokeWidth="2"/>
                  </svg>
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className="magnetic-input"
                    autoComplete="off"
                  />
                  <div className="input-glow"></div>
                </div>
              </label>
            </div>

            {/* Email Field */}
            <div className={`form-group magnetic-field ${focusedField === 'email' ? 'focused' : ''}`}>
              <label className="floating-label">
                <span className="label-text">Email</span>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" strokeWidth="2"/>
                  </svg>
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className="magnetic-input"
                    autoComplete="off"
                  />
                  <div className="input-glow"></div>
                </div>
              </label>
            </div>

            {/* Password Field */}
            <div className={`form-group magnetic-field ${focusedField === 'password' ? 'focused' : ''}`}>
              <label className="floating-label">
                <span className="label-text">Password</span>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2"/>
                  </svg>
                  <input
                    type="password"
                    name="password"
                    placeholder=" "
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    className="magnetic-input"
                    autoComplete="off"
                  />
                  <div className="input-glow"></div>
                </div>
              </label>
            </div>

            {/* Role Select Field */}
            <div className={`form-group magnetic-field ${focusedField === 'role' ? 'focused' : ''}`}>
              <label className="floating-label">
                <span className="label-text">Select Role</span>
                <div className="input-wrapper select-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10 10 10 0 0 0-10-10z" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" strokeWidth="2"/>
                  </svg>
                  <select
                    name="role_code"
                    value={formData.role_code}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('role')}
                    onBlur={handleBlur}
                    className="magnetic-select"
                    disabled={loading}
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.role_code}>
                        {role.role_code}
                      </option>
                    ))}
                  </select>
                  {loading && (
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
              className={`btn-primary magnetic-btn ${submitting ? 'submitting' : ''}`}
              type="submit"
              disabled={submitting}
            >
              <span className="btn-content">
                {submitting ? (
                  <>
                    <span className="spinner"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <span>Create User</span>
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2"/>
                    </svg>
                  </>
                )}
              </span>
              <div className="btn-glow"></div>
            </button>
          </form>

          {/* Progress Steps */}
          <div className="form-progress">
            <div className={`progress-step ${formData.name ? 'completed' : ''}`}>
              <span className="step-indicator">1</span>
              <span className="step-label">Name</span>
            </div>
            <div className={`progress-step ${formData.email ? 'completed' : ''}`}>
              <span className="step-indicator">2</span>
              <span className="step-label">Email</span>
            </div>
            <div className={`progress-step ${formData.password ? 'completed' : ''}`}>
              <span className="step-indicator">3</span>
              <span className="step-label">Password</span>
            </div>
            <div className={`progress-step ${formData.role_code ? 'completed' : ''}`}>
              <span className="step-indicator">4</span>
              <span className="step-label">Role</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUserPage;