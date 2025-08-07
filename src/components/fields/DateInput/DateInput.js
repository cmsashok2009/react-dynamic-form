import React from 'react';
import PropTypes from 'prop-types';

const DateInput = ({ label, value, onChange, error }) => {
  const fieldId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="form-group">
      <label htmlFor={fieldId}>{label}</label>
      <input
        id={fieldId}
        type="date"
        value={value}
        onChange={onChange}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        data-testid={`date-${fieldId}`}
        className="form-control"
      />
      {error && (
        <span id={`${fieldId}-error`} className="text-danger">
          {error}
        </span>
      )}
    </div>
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

DateInput.defaultProps = {
  error: '',
};

export default DateInput;
