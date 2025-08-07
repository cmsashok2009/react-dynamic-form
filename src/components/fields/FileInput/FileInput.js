import React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({ label, onChange, id = 'file-input' }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input type="file" id={id} onChange={onChange} data-testid="file-input" aria-label={label} />
  </div>
);

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string, // optional override for custom usage
};

export default FileInput;
