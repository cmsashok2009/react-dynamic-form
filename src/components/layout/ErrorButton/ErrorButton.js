import React, { useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  background-color: ${({ $hasErrors, $highlightColor, $idleColor }) =>
    $hasErrors ? $highlightColor : $idleColor};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  min-width: 250px;
  max-height: 300px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;

  &:hover {
    background-color: #fce4e4;
  }
`;

const ErrorButton = ({
  errors,
  onSelect,
  buttonLabel = "Errors",
  highlightColor = "red",
  idleColor = "gray",
}) => {
  const [open, setOpen] = useState(false);
  const hasErrors = errors.length > 0;

  return (
    <Wrapper>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        $hasErrors={hasErrors}
        $highlightColor={highlightColor}
        $idleColor={idleColor}
      >
        {buttonLabel} {hasErrors ? `(${errors.length})` : ""}
      </Button>

      {open && hasErrors && (
        <Dropdown>
          {errors.map((err, idx) => (
            <DropdownItem
              key={idx}
              onClick={() => {
                setOpen(false);
                onSelect(err.fieldId);
              }}
            >
              <strong>{err.cardTitle}</strong>: {err.label}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

ErrorButton.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      cardTitle: PropTypes.string.isRequired,
      fieldId: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string,
  highlightColor: PropTypes.string,
  idleColor: PropTypes.string,
};

export default ErrorButton;
