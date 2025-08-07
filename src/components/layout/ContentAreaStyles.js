// ContentAreaStyles.js
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

export const Container = styled.div`
  background-color: #f3f4f6;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%; /* ensure it spans available width */
  max-width: 100%; /* prevent default shrinkage */
`;

export const CardWrapper = styled.div`
  width: 100%;
  border-radius: 0.375rem;
  overflow: hidden;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: relative;

  &::before {
    content: '';
    width: 4px;
    background-color: #2563eb;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }
`;
