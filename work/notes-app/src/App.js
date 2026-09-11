import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or just show app
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading-container" style={{ height: '100vh' }}>
        <div className="loading-spinner"></div>
        <p>Loading your last session...</p>
      </div>
    );
  }

  return <Dashboard />;
}

export default App;