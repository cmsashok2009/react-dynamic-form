import React from "react";

const TextareaInput = ({ label, value, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <textarea value={value} onChange={onChange} className="form-control" />
  </div>
);

export default TextareaInput;
