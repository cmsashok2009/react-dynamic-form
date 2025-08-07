import React from 'react';
import PropTypes from 'prop-types';

const RadioInput = ({ label, options, selectedValue, onChange, name }) => {
  const groupId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="form-group" role="radiogroup" aria-labelledby={`${groupId}-label`}>
      <label id={`${groupId}-label`} className="form-label">
        {label}
      </label>
      {options.map((option, index) => {
        const optionId = `${groupId}-option-${index}`;
        return (
          <div key={option} className="form-check">
            <input
              type="radio"
              id={optionId}
              name={name || groupId}
              value={option}
              checked={selectedValue === option}
              onChange={onChange}
              aria-checked={selectedValue === option}
              data-testid={`radio-${groupId}-${index}`}
              className="form-check-input"
            />
            <label htmlFor={optionId} className="form-check-label">
              {option}
            </label>
          </div>
        );
      })}
    </div>
  );
};

RadioInput.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string, // optional for external control
};

export default RadioInput;
