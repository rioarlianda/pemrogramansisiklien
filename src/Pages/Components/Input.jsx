// src/Components/Input.jsx
import React from 'react';

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`border p-2 rounded-md ${className}`}
      {...props} // <--- PASTIKAN ADA INI! Ini meneruskan semua props lainnya (type, name, value, onChange, required, placeholder, dll.)
    />
  );
};

export default Input;