import React from "react";

const SelectInput = ({ label, value, options, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <select value={value} onChange={onChange} className="form-control">
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
