import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({ label, value, options, onChange, name = '' }) => {
  const id = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="form-group">
      <label htmlFor={id} id={`${id}-label`}>
        {label}
      </label>
      <select
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        className="form-control"
        aria-labelledby={`${id}-label`}
        aria-invalid={value === ''}
        data-testid={`select-${id}`}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default SelectInput;
