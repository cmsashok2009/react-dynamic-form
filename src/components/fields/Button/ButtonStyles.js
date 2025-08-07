/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

export const StyledButton = styled.button`
  background-color: #4b79a1; /* Base color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer; /* Hand symbol on hover */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a5c7d; /* Darker shade on hover */
  }

  ${(props) =>
    props.position === 'center' &&
    `
      display: block;
      margin: 0 auto;
  `}

  ${(props) =>
    props.position === 'left' &&
    `
      margin-left: 0;
  `}

  ${(props) =>
    props.position === 'right' &&
    `
      margin-left: auto;
  `}
`;
