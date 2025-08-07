import React from 'react';
import PropTypes from 'prop-types';

const GenericInput = ({ label, type, value, onChange, required, id }) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="form-group">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
        required={required}
        data-testid={inputId}
        aria-label={label}
      />
    </div>
  );
};

GenericInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  id: PropTypes.string, // Optional override for input ID
};

GenericInput.defaultProps = {
  required: false,
  id: undefined,
};

export default GenericInput;
