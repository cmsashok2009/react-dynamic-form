import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message, id, className }) => (
  <span role="alert" aria-live="assertive" className={`text-danger ${className || ''}`} id={id}>
    {message}
  </span>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
};

ErrorMessage.defaultProps = {
  id: undefined,
  className: '',
};

export default ErrorMessage;
