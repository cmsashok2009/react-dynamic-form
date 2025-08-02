import React from "react";

const DateInput = ({ label, value, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type="date" value={value} onChange={onChange} />
  </div>
);

export default DateInput;
