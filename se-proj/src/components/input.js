// components/input.js
import React from "react";

const Input = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
    
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #444",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        marginBottom: "1.2rem",
        fontSize: "14px",
      }}
    />
  );
};

export default Input;
