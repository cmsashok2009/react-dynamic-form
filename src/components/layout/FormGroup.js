import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({ children, 'data-testid': testId, ariaLabel }) => (
  <div className="form-group" role="group" aria-label={ariaLabel} data-testid={testId}>
    {children}
  </div>
);

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  'data-testid': PropTypes.string,
  ariaLabel: PropTypes.string,
};

FormGroup.defaultProps = {
  'data-testid': undefined,
  ariaLabel: undefined,
};

export default FormGroup;
