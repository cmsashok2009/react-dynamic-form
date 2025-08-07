import React from 'react';
import PropTypes from 'prop-types';

const RangeInput = ({ label, value, onChange, min = 0, max = 100, step = 1, name }) => {
  const id = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="form-group">
      <label htmlFor={id} id={`${id}-label`}>
        {label}
      </label>
      <input
        type="range"
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-labelledby={`${id}-label`}
        data-testid={`range-${id}`}
      />
    </div>
  );
};

RangeInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  name: PropTypes.string,
};

export default RangeInput;
