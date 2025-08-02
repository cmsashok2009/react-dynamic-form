import React from "react";

const TimeInput = ({ label, value, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type="time" value={value} onChange={onChange} />
  </div>
);

export default TimeInput;
