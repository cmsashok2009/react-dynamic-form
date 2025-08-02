import React from "react";
import styled from "@emotion/styled";

const StyledHeader = styled.header`
  background: linear-gradient(
    to bottom,
    #2c3e50,
    #4b79a1
  ); /* Darker blue gradient, top to bottom */
  padding: 20px;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  text-align: center;
  height: 85px;
`;

const Header = ({ title }) => {
  return (
    <StyledHeader>
      <h1>{title}</h1>
    </StyledHeader>
  );
};

export default Header;
