import React from "react";
import Button from "./Button"; // Adjust the path as needed
import {
  Container,
  ButtonGroup,
  HorizontalLine,
  RightButtonGroup,
} from "./ActionItemsStyles"; // Import styled components

const ActionItems = ({ actions }) => {
  // Sort actions based on priority
  const sortedActions = actions.sort((a, b) => a.priority - b.priority);

  // Separate actions based on position
  const leftActions = sortedActions.filter(
    (action) => action.buttonPosition === "left"
  );
  const rightActions = sortedActions.filter(
    (action) => action.buttonPosition === "right"
  );

  return (
    <Container>
      {/* Left-aligned buttons */}
      <ButtonGroup>
        {leftActions.map((action, index) => (
          <Button key={index} onClick={action.onClick} position="left">
            {action.label}
          </Button>
        ))}
      </ButtonGroup>

      {/* Right-aligned buttons */}
      <RightButtonGroup>
        {rightActions.map((action, index) => (
          <Button key={index} onClick={action.onClick} position="right">
            {action.label}
          </Button>
        ))}
      </RightButtonGroup>

      {/* Horizontal line at the bottom */}
      <HorizontalLine />
    </Container>
  );
};

export default ActionItems;
