import React from "react";
import Button from "../Button/Button";
import FormErrorDropdown from "../Dropdown/FormErrorDropdown";
import {
  Container,
  ButtonGroup,
  HorizontalLine,
  RightButtonGroup,
} from "./ActionItemsStyles";

const ActionItems = ({ actions }) => {
  const sortedActions = actions.sort((a, b) => a.priority - b.priority || 0);

  const leftActions = sortedActions.filter((a) => a.align === "left");
  const rightActions = sortedActions.filter((a) => a.align === "right");

  const renderAction = (action, index) => {
    switch (action.type) {
      case "button":
        return (
          <Button
            key={index}
            onClick={action.onChange}
            variant={action.buttonType}
            disabled={action.isDisabled}
            position={action.align}
          >
            {action.label}
          </Button>
        );
      case "formErrorDropdown":
        return (
          <FormErrorDropdown
            key={index}
            label={action.label}
            options={action.options}
            onChange={action.onChange} // onFormErrorClick
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <ButtonGroup>{leftActions.map(renderAction)}</ButtonGroup>

      <RightButtonGroup>{rightActions.map(renderAction)}</RightButtonGroup>

      <HorizontalLine />
    </Container>
  );
};

export default ActionItems;
