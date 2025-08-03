import React from "react";

const RangeInput = ({ label, value, onChange, min, max }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type="range" value={value} onChange={onChange} min={min} max={max} />
  </div>
);

export default RangeInput;
