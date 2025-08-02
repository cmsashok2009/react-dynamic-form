import React from "react";
import styled from "@emotion/styled";

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column; /* Align items vertically */
  gap: 10px; /* Space between links */
  margin-bottom: 10px; /* Space below the links */
  position: sticky; /* Make the container sticky */
  top: 150px; /* Adjust based on your layout */
  background-color: white; /* Ensure the background is white for visibility */
  z-index: 999; /* Keep it above other content */
  padding: 10px; /* Optional: padding inside the container */
`;

const Heading = styled.h4`
  font-weight: bold;
  color: #3a5c7d;
  margin-bottom: 15px;
  text-align: center;
`;

const LinkItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-start; /* Align number and text at top */
  gap: 8px;

  /* Wrap text nicely and indent after number */
`;

const Number = styled.span`
  flex-shrink: 0; /* Prevent shrinking */
  color: ${({ isActive }) => (isActive ? "#3a5c7d" : "#4b79a1")};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  user-select: none;
`;

const LinkText = styled.span`
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  color: ${({ isActive }) => (isActive ? "#3a5c7d" : "black")};
  text-decoration: ${({ isActive }) => (isActive ? "underline" : "none")};
  text-decoration-color: #3a5c7d;
  /* For proper word wrap and indentation */
  /* We let this span wrap naturally with no special indentation */
`;

const QuickLink = ({ titles, activeIndex, onClick }) => {
  return (
    <LinkContainer>
      <Heading>Quick Link</Heading>
      {titles.map((title, index) => (
        <LinkItem key={index} onClick={() => onClick(index)}>
          <Number isActive={activeIndex === index}>{index + 1}.</Number>
          <LinkText isActive={activeIndex === index}>{title}</LinkText>
        </LinkItem>
      ))}
    </LinkContainer>
  );
};

export default QuickLink;
