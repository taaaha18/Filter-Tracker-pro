import React, { useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/dashboard1-style.css';
import VehicleInfo from './vehicleinfo';
import '../styles/vehicleInfo-style.css';
import useVehicleData from './useVehicleData';

function Dashboard1() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Always get the latest username from location state
  const username = location.state?.username || 'User';
  
  // Use the custom hook to fetch vehicle data
  const { vehicles, loading, refetchVehicles } = useVehicleData(username);
  
  // Force a refetch when location changes
  useEffect(() => {
    if (username) {
      refetchVehicles();
    }
    // Adding location.key to dependencies will cause this effect to run
    // whenever navigation occurs, even to the same route
  }, [location.key, username, refetchVehicles]);

  const handleUpdateInfo = () => {
    navigate('/dashboard2', { state: { username } });
  };

  const handleRecommendedOil = () => {
    navigate('/recomDisplay', { state: { username } });
  };

  const handleserviceOil = () => {
    navigate('/card_display', { state: { username } });
  };
  
  const handleUpdateinfoo = () => {
    navigate('/update1', { state: { username } });
  };

  const handleHome = () => {
    // When navigating to the same page, we need to force React Router to recognize
    // it as a new navigation event by using replace
    navigate('/dashboard1', { state: { username }, replace: true });
  };

  console.log("Dashboard rendering with username:", username);
  console.log("Current vehicles data:", vehicles);

  return (
    <div className="dashboard-container">
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

      <div className="dashboard-content">
        <h1>Welcome, {username}!</h1>
        <p>This is your dashboard homepage. Navigate around to explore more!</p>

        {loading ? (
          <p>Loading vehicle information...</p>
        ) : vehicles && vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <VehicleInfo
              key={index}
              vehicleNumber={vehicle.vehicle_number}
              mileage={vehicle.mileage}
              lastUpdate={vehicle.last_oil_change_date}
            />
          ))
        ) : (
          <p>No vehicles found. {username !== 'User' ? 'Please add a vehicle.' : 'Please log in to see your vehicles.'}</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard1;