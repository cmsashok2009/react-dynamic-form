// CardStyles.js
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

export const CardContainer = styled.div`
  border: 1px solid #ccc;
  background-color: white;
  padding: 10px;
  cursor: pointer;
  transition: border 0.3s;
  ${({ isActive }) =>
    isActive &&
    `
    border: 2px solid blue; /* Highlight active card */
  `}
`;
