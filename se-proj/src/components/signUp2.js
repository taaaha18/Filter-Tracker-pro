import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DynamicInput from "./input"; // adjust path if needed
import "../styles/signUp-style.css";


const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    email: '',
    username: '',
    dob: '',
    region: '',
    phone: '', 
    password: '',
    confirmPassword: ''
  });
  const passwordsMatch = formData.confirmPassword === '' || formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Simple frontend validations
    if (
      !formData.name ||
      !formData.fullName ||
      !formData.email ||
      !formData.username ||
      !formData.dob ||
      !formData.region ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // Password match check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    // Prepare data excluding confirmPassword
    const { confirmPassword, ...dataToSend } = formData;
  
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Server Response:', result);
        alert('Signup successful!');
        setFormData({
          name: '',
          fullName: '',
          email: '',
          username: '',
          dob: '',
          region: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        const error = await response.text();
        console.error('Error from server:', error);
        alert('Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Network Error:', err);
      alert('An error occurred. Please check your connection and try again.');
    }
  };
  
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Signup</h2>
      <p style={styles.subtitle}>Create a new account</p>
      
      <button style={styles.googleBtn}>
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          style={{ marginRight: "10px" }}
        >
          <path 
            fill="#4285F4" 
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
          />
          <path 
            fill="#34A853" 
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
          />
          <path 
            fill="#FBBC05" 
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
          />
          <path 
            fill="#EA4335" 
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
          />
        </svg>
        Sign up with Google
      </button>

      <hr style={styles.divider} />

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your name"
          required
        />

        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your full name"
          required
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your email address"
          required
        />

        <label style={styles.label}>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
          placeholder="Choose a username"
          required
        />

        <label style={styles.label}>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Region</label>
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select Region</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>

        <label style={styles.label}>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your phone number"
          required
        />

<label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={{
            ...styles.input,
            border: !passwordsMatch ? "1px solid red" : styles.input.border,
          }}
          required
        />

        {/* 🆕 Added Password mismatch warning */}
        {!passwordsMatch && (
          <p style={styles.warningText}>Passwords do not match</p>
        )}

        {/* 🆕 Disable button if passwords do not match */}
        <button
  type="submit"
  style={{
    ...styles.submitBtn,
    backgroundColor: passwordsMatch ? "#e10600" : "#555", // F1 red
    cursor: passwordsMatch ? "pointer" : "not-allowed",
  }}
  disabled={!passwordsMatch}
>
  Sign Up
</button>


      </form>
      <p style={styles.link}>
        Already have an account? <Link to="/" style={styles.signupLink}>Sign In</Link>
      </p>
    </div>
  );
};
const styles = {
  container: {
    width: "450px",
    margin: "4rem auto",
    backgroundColor: "#0f0f0f", // Carbon black
    padding: "2rem",
    borderRadius: "12px",
    color: "#fff",
    fontFamily: "'Orbitron', sans-serif", // Formula 1 feel
    boxShadow: "0 0 30px rgba(225, 6, 0, 0.5)", // F1 red glow
    border: "2px solid #e10600",
  },
  title: {
    fontSize: "30px",
    marginBottom: "0.5rem",
    textAlign: "center",
    color: "#e10600", // Red title
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "1.5rem",
    color: "#aaa",
    textAlign: "center",
    fontStyle: "italic",
  },
  googleBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    border: "1px solid #e10600",
    borderRadius: "6px",
    marginBottom: "1.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    margin: "20px 0",
    borderColor: "#e10600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontSize: "14px",
    color: "#ddd",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  input: {
    padding: "12px",
    marginBottom: "16px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #e10600",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px",
  },
  warningText: {
    color: "#ff4d4d",
    marginTop: "-10px",
    marginBottom: "10px",
    fontSize: "13px",
    fontWeight: "bold",
  },
  submitBtn: {
    marginTop: "1rem",
    padding: "12px",
    backgroundColor: "#e10600",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  link: {
    marginTop: "20px",
    textAlign: "center",
    color: "#aaa",
    fontSize: "14px",
  },
  signupLink: {
    color: "#e10600",
    textDecoration: "none",
    fontWeight: "bold",
    marginLeft: "5px",
  },
};


export default SignupForm;