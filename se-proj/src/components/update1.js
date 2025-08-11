// pages/ProfileSettings.js
import React, { useState, useEffect } from "react";
import Input from "./input";
import "../styles/update1-style.css";
import { useLocation, useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();  

  // Get the username from the state passed in the navigation
  const [username, setUsername] = useState(location.state?.username || ""); 
  const [email, setEmail] = useState("user@gmail.com");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!username) {
      // If there's no username in state, navigate back or to some fallback page
      navigate('/login'); // Replace '/login' with the appropriate fallback route
    }
  }, [username, navigate]);

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
    navigate('/dashboard1', { state: { username }, replace: true });
  };

  const handleVehicleDetails = () => {
    // Navigate to the VehicleDetails page, passing the username
    navigate('/vehicleDetails', { state: { username } });
  };
  const handleProfileDetails = () => {
    // Navigate to the VehicleDetails page, passing the username
    navigate('/profile', { state: { username } });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          oldPassword,
          newPassword,
          email,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        alert('Profile updated successfully!');
      } else {
        alert(data.message || 'Profile update failed.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="settings-container">
      <nav className="navbar">
        <div className="navbar-logo">Filter TrackerPro</div>
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

      <h2>Settings</h2>
      <p className="subtitle">Manage your account settings and set e-mail preferences.</p>
      <div className="tabs">
      <div className="tab selected" onClick={handleProfileDetails}>Profile</div>
        <div className="tab" onClick={handleVehicleDetails}>Vehicle Details</div>
      </div>
      <div className="profile-section">
        <h3>Profile</h3>
        <p>This is how others will see you on the site.</p>

        <label>Username</label>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <p className="info-text">
          This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
        </p>

        <label>Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <p className="info-text">
          You can manage verified email addresses in your email settings.
        </p>

        <label>Old Password</label>
        <Input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Enter old password"
        />

        <label>New Password</label>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />

        <button className="update-button" onClick={handleSubmit}>Update profile</button>
      </div>
    </div>
  );
};

export default ProfileSettings;
