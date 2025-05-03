import React, { useState } from 'react';
import '../styles/recomDisplay-style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const EngineOilDashboard = () => {
  // Get username from location state instead of props
  const location = useLocation();
  const username = location.state?.username || 'User';
  
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [querySent, setQuerySent] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState('');
  
  const navigate = useNavigate();
     
  // Console log to help with debugging
  console.log("EngineOilDashboard rendering with username:", username);
  
  const handleUpdateInfo = () => {
    navigate('/dashboard2', { state: { username } });
  };

  const handleRecommendedOil = () => {
    navigate('/recomDisplay', { state: { username } });
  };
  const handleUpdateinfoo = () => {
    navigate('/update1', { state: { username } });
  };
  const handleserviceOil = () => {
    navigate('/card_display', { state: { username } });
  };
  
  const handleHome = () => {
    // Make sure to pass username in state and use replace: true to force a fresh navigation
    navigate('/dashboard1', { state: { username }, replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecommendation('');
    setQuery('');
    setQuerySent(false);
    setGeminiResponse('');
    setLoading(true);
 
    try {
      const res = await fetch('http://localhost:3000/api/get-recommendation-by-vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicle_number: vehicleNumber }),
      });

      const data = await res.json();
      if (res.ok) {
        setRecommendation(data.suggestion);
      } else {
        setRecommendation(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setRecommendation('Server error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await fetch('http://localhost:3000/api/send-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recommendation, query }),
      });

      const data = await res.json();
      if (res.ok) {
        setQuerySent(true);
        setGeminiResponse(data.geminiResponse);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to send query. Server error.');
    }
  };

  return (
    <div className="dashboard" style={{ backgroundImage: `url(${"../images.d4.jpg"})` }}>
      <nav className="navbar">
        <div className="navbar-logo">Filter Tracker Pro</div>
        <ul className="navbar-links">
          <li>
            <button className='otherButtons' onClick={handleHome}>
              Home
            </button>
          </li>
          <li>
            <button className='otherButtons' onClick={handleRecommendedOil}>
              Recommended Oil
            </button>
          </li>
          <li>
            <button className='otherButtons' onClick={handleserviceOil}>
              services
            </button>
          </li>
          <li>
            <button className='otherButtons' onClick={handleUpdateinfoo}>
              UpdateProfile
            </button>
          </li>
        
          <li>
            <button className="update-btn" onClick={handleUpdateInfo}>
              Update Info
            </button>
          </li>
        </ul>
      </nav>
      <div className="dashboard-card">
        <h1 className="dashboard-title">🚗 Welcome, {username}</h1>
        <p className="dashboard-sub">Enter your vehicle number to get a personalized engine oil recommendation.</p>

        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="number"
            placeholder="Enter Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Fetching...' : 'Get Recommendation'}
          </button>
        </form>

        {recommendation && (
          <>
            <div className="suggestion-box">
              <h3>🔧 Recommended Engine Oil:</h3>
              <p>{recommendation}</p>
            </div>

            <form onSubmit={handleQuerySubmit} className="query-form">
              <label htmlFor="query-input">❓ Do you have any query?</label>
              <input
                id="query-input"
                type="text"
                placeholder="Ask your question here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">Submit Query</button>
              {querySent && <p className="query-success">✅ Your query has been sent!</p>}
            </form>

            {geminiResponse && (
              <div className="gemini-response-box">
                <h3>💬 Answer:</h3>
                <p>{geminiResponse}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EngineOilDashboard;