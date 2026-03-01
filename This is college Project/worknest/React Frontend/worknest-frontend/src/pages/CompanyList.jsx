import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import "./CompanyList.css"; // Import the CSS file

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:4000/api/companies",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      console.log("API Response:", res.data);
      setCompanies(res.data.companies || []);
      setError(null);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter companies based on search
  const filteredCompanies = companies.filter(company => 
    company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.id?.toString().includes(searchTerm)
  );

  return (
    <div className="companies-page">
      <div className="companies-card">
        {/* Header Section */}
        <div className="companies-header">
          <h2 className="companies-title">
            <span className="title-icon">🏢</span>
            Company Management
          </h2>
          <div className="companies-stats">
            <span>Total Companies</span>
            <span className="stats-badge">{companies.length}</span>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="filters-section">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search companies by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className="refresh-btn"
            onClick={fetchCompanies}
            disabled={loading}
          >
            <span className="refresh-icon">↻</span>
            Refresh
          </button>
        </div>

        {/* Result Count */}
        <div className="result-count">
          Showing {filteredCompanies.length} of {companies.length} companies
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading companies...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="error-state">
            <span className="error-icon">⚠️</span>
            <h4>{error}</h4>
            <button onClick={fetchCompanies} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredCompanies.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🏢</div>
            <h4>No Companies Found</h4>
            {searchTerm ? (
              <p>No companies match your search criteria</p>
            ) : (
              <p>There are no companies to display at the moment</p>
            )}
            {searchTerm && (
              <button 
                className="clear-btn"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Companies Table */}
        {!loading && !error && filteredCompanies.length > 0 && (
          <div className="companies-table-wrapper">
            <table className="companies-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Company Name</th>
                  <th>Email Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company, index) => (
                  <tr key={company.id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <td>
                      <span className="company-id">#{company.id}</span>
                    </td>
                    <td>
                      <div className="company-name-cell">
                        <span className="company-icon">🏢</span>
                        <span className="company-name">{company.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="company-email">
                        <span className="email-icon">📧</span>
                        <a href={`mailto:${company.email}`} className="email-link">
                          {company.email}
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="view-btn"
                          onClick={() => alert(`View details for ${company.name}`)}
                        >
                          <span>👁️</span>
                          View
                        </button>
                        <button 
                          className="edit-btn"
                          onClick={() => alert(`Edit ${company.name}`)}
                        >
                          <span>✎</span>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyList;