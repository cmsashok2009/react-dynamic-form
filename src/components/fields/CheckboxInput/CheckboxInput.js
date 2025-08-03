import React from "react";

const CheckboxInput = ({ label, checked, onChange }) => (
  <div className="form-group">
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  </div>
);

export default CheckboxInput;
