import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledHeader = styled.header`
  background: linear-gradient(to bottom, #2c3e50, #4b79a1);
  padding: 20px;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  text-align: center;
  height: 85px;
`;

const Header = ({ title, headingLevel, 'data-testid': testId, ariaLabel }) => {
  const HeadingTag = `h${headingLevel}`; // dynamically use h1–h6

  return (
    <StyledHeader data-testid={testId} aria-label={ariaLabel}>
      <HeadingTag>{title}</HeadingTag>
    </StyledHeader>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  'data-testid': PropTypes.string,
  ariaLabel: PropTypes.string,
};

Header.defaultProps = {
  headingLevel: 1,
  'data-testid': undefined,
  ariaLabel: 'Application Header',
};

export default Header;
