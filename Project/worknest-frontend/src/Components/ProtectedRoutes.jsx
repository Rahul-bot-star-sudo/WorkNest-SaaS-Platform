// auth/ProtectedRoute.jsx - FIXED (No infinite loop)
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    // Check authentication only once when component mounts
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      // Clear invalid data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    }
  }, []); // ✅ Empty array = runs only once

  // Show loading while checking
  if (isAuth === null) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: 'var(--bg-main)'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
}

export default ProtectedRoute;