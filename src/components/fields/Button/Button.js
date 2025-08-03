// Button.js
import React from "react";
import { StyledButton } from "./ButtonStyles";

const Button = ({ type = "button", onClick, children, position, callback }) => {
  const handleClick = () => {
    if (onClick) onClick();
    if (callback) callback();
  };

  return (
    <StyledButton type={type} onClick={handleClick} position={position}>
      {children}
    </StyledButton>
  );
};

export default Button;
