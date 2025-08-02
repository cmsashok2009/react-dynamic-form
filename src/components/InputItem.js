import React, { useState } from "react";
import styled from "@emotion/styled";

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
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const InputItem = ({ type, label, options }) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  const validateInput = (val) => {
    // Example validation: only allow letters and numbers
    const regex = /^[a-zA-Z0-9]*$/; // Adjust validation as needed
    if (!regex.test(val)) {
      setIsValid(false);
      setError("Invalid characters. Only letters and numbers are allowed.");
    } else {
      setIsValid(true);
      setError("");
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    if (type === "text") {
      validateInput(value);
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      {type === "text" && (
        <TextInput
          type="text"
          value={value}
          onChange={handleChange}
          isValid={isValid}
        />
      )}
      {type === "dropdown" && (
        <Dropdown value={value} onChange={handleChange}>
          <option value="">Select...</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Dropdown>
      )}
      <ErrorMessage show={!isValid}>{error}</ErrorMessage>
    </div>
  );
};

export default InputItem;
