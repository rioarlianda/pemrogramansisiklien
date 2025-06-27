// src/Components/Button.jsx
import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold ${className}`}
      {...props} // <--- PASTIKAN ADA INI! Ini meneruskan semua props lainnya (type, onClick, dll.)
    >
      {children}
    </button>
  );
};

export default Button;