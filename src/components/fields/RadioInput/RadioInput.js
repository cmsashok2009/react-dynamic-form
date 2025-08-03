import React from "react";

const RadioInput = ({ label, options, selectedValue, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    {options.map((option) => (
      <label key={option}>
        <input
          type="radio"
          value={option}
          checked={selectedValue === option}
          onChange={onChange}
        />
        {option}
      </label>
    ))}
  </div>
);

export default RadioInput;
