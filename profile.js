// UserProfile.jsx
import React, { useEffect, useState } from 'react';
import '../styles/profile-style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();  
  

    
    // Always get the latest username from location state
    const username = location.state?.username || 'User';
  const handleUpdateInfo = () => {
    navigate('/dashboard2');
  };

  const handleRecommendedOil = () => {
    navigate('/recomDisplay');
  };

  const handleserviceOil = () => {
    navigate('/card_display');
  };
  
  const handleUpdateinfoo = () => {
    navigate('/update1');
  };
  
  const handleHome = () => {
    navigate('/dashboard1');
  };

  const handleBack = () => {
    if (user && user.username) {
      navigate(`/update1`, { state: { username } });
    }
  };

  useEffect(() => {
    fetch('http://localhost:3000/card')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setUser(data[0]); // Assuming you want the first user for now
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  if (!user) {
    return <div className="loading">Loading Profile...</div>;
  }

  return (
    <div className="profile-container">
    

      <h2>User Profile</h2>
      <div className="profile-info">
        <p><span>Full Name:</span> {user.full_name}</p>
        <p><span>Username:</span> {user.username}</p>
        <p><span>Email:</span> {user.email}</p>
        <p><span>Date of Birth:</span> {new Date(user.DOB).toLocaleDateString()}</p>
        <p><span>Region:</span> {user.region}</p>
        <p><span>Phone Number:</span> {user.phone_number}</p>
      </div>

      {/* Back Button */}
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default UserProfile;
