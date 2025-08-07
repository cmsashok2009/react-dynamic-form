import React from 'react';
import PropTypes from 'prop-types';

const CheckboxInput = ({ label, checked, onChange }) => (
  <div className="form-group">
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        data-testid={`checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`}
      />
      {label}
    </label>
  </div>
);

CheckboxInput.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxInput;
