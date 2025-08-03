import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useScrollContext } from "../../../context/ScrollContext";

// Styled components
const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.9em;
  margin-bottom: 5px;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid ${({ isValid }) => (isValid ? "#ccc" : "red")};
  border-radius: 4px;
  transition: border 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ isValid }) => (isValid ? "blue" : "red")};
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid ${({ isValid }) => (isValid ? "#ccc" : "red")};
  border-radius: 4px;
`;

// Input renderers
const renderText = (props) => <StyledInput type="text" {...props} />;
const renderDropdown = (props, options) => (
  <StyledSelect {...props}>
    <option value="">Select...</option>
    {options.map((option, i) => (
      <option key={i} value={option.value}>
        {option.label}
      </option>
    ))}
  </StyledSelect>
);

// TODO: Add more renderers like renderTextarea, renderCheckbox, etc.

const InputItem = ({
  type,
  label,
  options = [],
  required = false,
  value = "",
  error = "",
  onChange,
  inputRef,
}) => {
  const isValid = !error;
  const localRef = useRef(null);
  const { isProgrammaticScroll } = useScrollContext();
  const fieldId = label.toLowerCase().replace(/\s+/g, "-"); // unique-ish ID

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;

    const preventAutoScroll = (e) => {
      if (!isProgrammaticScroll) {
        e.preventDefault();
        requestAnimationFrame(() =>
          el.setSelectionRange?.(el.value.length, el.value.length)
        );
      }
    };

    el.addEventListener("focus", preventAutoScroll, { passive: false });
    return () => el.removeEventListener("focus", preventAutoScroll);
  }, [isProgrammaticScroll]);

  const sharedProps = {
    id: fieldId,
    name: fieldId,
    value,
    onChange,
    isValid,
    ref: (el) => {
      localRef.current = el;
      if (el) inputRef?.(el);
    },
    "aria-invalid": !isValid,
    "aria-describedby": error ? `${fieldId}-error` : undefined,
    "data-testid": `input-${fieldId}`,
  };

  const renderFieldByType = () => {
    switch (type) {
      case "text":
        return renderText(sharedProps);
      case "dropdown":
        return renderDropdown(sharedProps, options);
      // case "textarea": return renderTextarea(sharedProps);
      // case "checkbox": return renderCheckbox(sharedProps);
      default:
        return <div>Unsupported field type</div>;
    }
  };

  return (
    <div>
      <Label htmlFor={fieldId}>
        {label}
        {required && " *"}
      </Label>
      {renderFieldByType()}
      <ErrorMessage id={`${fieldId}-error`} show={!!error}>
        {error}
      </ErrorMessage>
    </div>
  );
};

InputItem.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  inputRef: PropTypes.func,
};

export default InputItem;
