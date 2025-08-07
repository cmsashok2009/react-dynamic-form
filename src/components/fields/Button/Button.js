// Button.js
import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './ButtonStyles';

const Button = ({ type, onClick, children, position, callback }) => {
  const handleClick = () => {
    if (onClick) onClick();
    if (callback) callback();
  };

  return (
    <StyledButton
      type={type}
      onClick={handleClick}
      position={position}
      data-testid={`button-${position || 'default'}`}
      aria-label={typeof children === 'string' ? children : 'button'}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  callback: PropTypes.func,
  children: PropTypes.node.isRequired,
  position: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  onClick: undefined,
  callback: undefined,
  position: undefined,
};

export default Button;
