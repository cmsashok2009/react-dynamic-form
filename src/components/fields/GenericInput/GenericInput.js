import React from "react";

const GenericInput = ({ label, type, value, onChange, required }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="form-control"
      required={required}
    />
  </div>
);

export default GenericInput;
