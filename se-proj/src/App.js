import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/signUp";   // Login Page
import SignUp2 from "./components/signUp2"; // Signup Page
import Dashboard1 from "./components/dashboard1";
import Dashboard2 from './components/dashboard2'; // adjust the path if needed
import Recomendation from './components/recomDisplay'; // adjust the path if needed
import Card from './components/card_dashboard'; // adjust the path if needed
import OilData from './components/oilDetail'; // adjust the path if needed
import Settings from './components/update1'
import Profile from './components/profile'
import VDetails from './components/vehicleDetails'
function App() {
  return (
    <Router>
      <Routes> {}
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp2 />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/recomDisplay" element={<Recomendation />} />
        <Route path="/card_display" element={<Card />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/vehicleDetails" element={<VDetails />} /> 
        <Route path="/update1" element={<Settings />} /> 
        <Route path="/oil/:id" element={<OilData />} /> 
      </Routes>
    </Router>
  );
}

export default App;
