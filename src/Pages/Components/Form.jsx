// src/Components/Form.jsx
import React from 'react';

const Form = ({ children, className, id, onSubmit, ...props }) => {
  return (
    <form
      id={id}
      className={className}
      onSubmit={onSubmit}
      {...props} // <--- PASTIKAN ADA INI!
    >
      {children}
    </form>
  );
};

export default Form;