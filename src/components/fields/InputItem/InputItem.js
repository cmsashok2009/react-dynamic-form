import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useScrollContext } from "../../../context/ScrollContext";

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const TextInput = styled.input`
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

const Dropdown = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid ${({ isValid }) => (isValid ? "#ccc" : "red")};
  border-radius: 4px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.9em;
  margin-bottom: 5px;
  display: ${({ show }) => (show ? "block" : "none")};
`;

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

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;

    const preventAutoScroll = (e) => {
      if (!isProgrammaticScroll) {
        e.preventDefault();
        // Optional: move cursor manually to avoid blocking UX
        requestAnimationFrame(() =>
          el.setSelectionRange?.(el.value.length, el.value.length)
        );
      }
    };

    el.addEventListener("focus", preventAutoScroll, { passive: false });

    return () => {
      el.removeEventListener("focus", preventAutoScroll);
    };
  }, [isProgrammaticScroll]);

  return (
    <div>
      <Label>
        {label}
        {required && " *"}
      </Label>
      {type === "text" && (
        <TextInput
          type="text"
          value={value}
          onChange={onChange}
          isValid={isValid}
          ref={(el) => {
            localRef.current = el;
            if (el) inputRef?.(el);
          }}
        />
      )}
      {type === "dropdown" && (
        <Dropdown
          value={value}
          onChange={onChange}
          isValid={isValid}
          ref={(el) => {
            localRef.current = el;
            if (el) inputRef?.(el);
          }}
        >
          <option value="">Select...</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Dropdown>
      )}
      <ErrorMessage show={!!error}>{error}</ErrorMessage>
    </div>
  );
};

export default InputItem;
