import React from 'react';
import PropTypes from 'prop-types';

const TimeInput = ({ label, value, onChange, required = false }) => {
  const fieldId = label.toLowerCase().replace(/\s+/g, '-');
  const errorId = `${fieldId}-error`;

  return (
    <div className="form-group">
      <label htmlFor={fieldId}>
        {label}
        {required && ' *'}
      </label>
      <input
        type="time"
        id={fieldId}
        name={fieldId}
        value={value}
        onChange={onChange}
        className="form-control"
        required={required}
        aria-required={required}
        aria-describedby={errorId}
        data-testid={`input-${fieldId}`}
      />
    </div>
  );
};

TimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default TimeInput;
