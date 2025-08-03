import React from "react";

const FileInput = ({ label, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type="file" onChange={onChange} />
  </div>
);

export default FileInput;
