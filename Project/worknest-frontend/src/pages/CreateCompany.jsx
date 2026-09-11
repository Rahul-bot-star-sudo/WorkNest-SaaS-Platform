import { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import "./CreateCompany.css"; // Import the CSS file

function CreateCompany() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post(
        "http://localhost:4000/api/companies",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      setSuccess(true);
      setName("");
      setEmail("");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      setError(error.response?.data?.message || "Error creating company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-company-page">
      <div className="create-company-card">
        {/* Decorative Elements */}
        <div className="card-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>

        {/* Header Section */}
        <div className="create-company-header">
          <div className="icon-wrapper">
            <span className="company-icon">🏢</span>
            <div className="icon-glow"></div>
          </div>
          <h2 className="create-company-title">Create New Company</h2>
          <p className="create-company-subtitle">Add a new company to your workspace</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="success-message">
            <span className="success-icon">✓</span>
            <span>Company created successfully!</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="create-company-form">
          {/* Company Name Field */}
          <div className={`form-group ${focusedField === 'name' ? 'focused' : ''} ${error && !name ? 'error' : ''}`}>
            <label htmlFor="companyName" className="field-label">
              <span className="label-icon">🏢</span>
              <span>Company Name</span>
            </label>
            <div className="input-wrapper">
              <input
                id="companyName"
                type="text"
                placeholder="e.g., Acme Corporation"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                disabled={loading}
                className="company-input"
                autoComplete="off"
              />
              <div className="input-glow"></div>
              {name && (
                <span className="input-char-count">
                  {name.length}/50
                </span>
              )}
            </div>
            {error && !name && (
              <span className="field-error">Company name is required</span>
            )}
          </div>

          {/* Company Email Field */}
          <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${error && !email ? 'error' : ''}`}>
            <label htmlFor="companyEmail" className="field-label">
              <span className="label-icon">📧</span>
              <span>Company Email</span>
            </label>
            <div className="input-wrapper">
              <input
                id="companyEmail"
                type="email"
                placeholder="e.g., contact@acme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                disabled={loading}
                className="company-input"
                autoComplete="off"
              />
              <div className="input-glow"></div>
            </div>
            {error && !email && (
              <span className="field-error">Company email is required</span>
            )}
            {email && !email.includes('@') && (
              <span className="field-error hint">Email should include @ symbol</span>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setName("");
                setEmail("");
                setError("");
              }}
              disabled={loading}
            >
              Clear Form
            </button>
            
            <button 
              type="submit" 
              className={`submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span className="btn-icon">✨</span>
                  <span>Create Company</span>
                </>
              )}
              <div className="btn-glow"></div>
            </button>
          </div>
        </form>

        {/* Quick Tips */}
        <div className="quick-tips">
          <h4 className="tips-title">
            <span className="tips-icon">💡</span>
            Quick Tips
          </h4>
          <ul className="tips-list">
            <li>Use the official company name as registered</li>
            <li>Use the primary contact email address</li>
            <li>You can add more details after creation</li>
          </ul>
        </div>

        {/* Progress Indicator */}
        <div className="form-progress">
          <div className="progress-step">
            <div className="step-dot"></div>
            <span className="step-label">Basic Info</span>
          </div>
          <div className="progress-step">
            <div className="step-dot"></div>
            <span className="step-label">Contact</span>
          </div>
          <div className="progress-step">
            <div className="step-dot"></div>
            <span className="step-label">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;